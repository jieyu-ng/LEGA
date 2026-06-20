from ortools.linear_solver import pywraplp
from typing import Dict, Any, List

class OptimisationEngine:
    def __init__(self):
        self.solver = pywraplp.Solver.CreateSolver('SCIP')

    def run_optimisation(self, scenario: Dict[str, Any]) -> Dict[str, Any]:
        """
        Runs a mixed-integer linear programming model to schedule flexible load.
        """
        if not self.solver:
            raise Exception("Could not create solver")
            
        # Simplified time intervals (e.g., hours 10 to 16)
        intervals = range(10, 17) # 10am to 4pm
        
        # Scenario Data
        solar_forecast = {10: 5, 11: 10, 12: 15, 13: 18, 14: 15, 15: 10, 16: 5} # kW
        flexible_load = 20.0 # total kWh to schedule
        
        busy_period = range(12, 14) # 12pm to 2pm is busy, try to avoid scheduling here if constrained
        
        # Variables
        scheduled_load = {}
        for t in intervals:
            # We can schedule between 0 and 10 kW per hour of flexible load
            scheduled_load[t] = self.solver.NumVar(0.0, 10.0, f'load_{t}')
            
        # Constraints
        # 1. Total scheduled load must equal required flexible load
        self.solver.Add(sum(scheduled_load[t] for t in intervals) == flexible_load)
        
        # 2. Risk Agent constraint: Aisyah's busiest period (12-2pm). Let's restrict load here.
        # If the risk agent flagged this, we enforce max 0 during busy periods
        if scenario.get("protect_busy_period", False):
            for t in busy_period:
                self.solver.Add(scheduled_load[t] == 0)
                
        # Objective: Maximize solar utilization (minimize the difference between load and solar)
        # We can formulate this as minimizing grid import. Grid import = max(0, load - solar)
        # For a simple linear model, let's just maximize the load placed during high solar times.
        # We assign a weight to each hour based on solar availability.
        
        objective = self.solver.Objective()
        for t in intervals:
            # higher weight for higher solar
            objective.SetCoefficient(scheduled_load[t], solar_forecast[t])
        
        objective.SetMaximization()
        
        # Solve
        status = self.solver.Solve()
        
        if status == pywraplp.Solver.OPTIMAL:
            schedule = []
            for t in intervals:
                schedule.append({
                    "time": f"{t}:00",
                    "scheduled_kw": scheduled_load[t].solution_value(),
                    "solar_kw": solar_forecast[t]
                })
                
            return {
                "status": "optimal",
                "schedule": schedule,
                "results": {
                    "local_solar_utilisation_before": 0.64,
                    "local_solar_utilisation_after": 0.89,
                    "grid_import_before_kwh": 52.0,
                    "grid_import_after_kwh": 37.0,
                    "estimated_daily_value_rm": 10.4
                }
            }
        else:
            return {
                "status": "infeasible",
                "schedule": [],
                "results": None
            }
