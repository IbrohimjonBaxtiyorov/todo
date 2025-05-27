import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { diagnosticTodo } from "../request";
import { setDiagnostic } from "../lib/redux-toolkit/slices/todo-slice";
import { toast } from "sonner";

const chartConfig = {
  low: { label: "Past", color: "#22c55e" },
  medium: { label: "O‘rtacha", color: "#facc15" },
  high: { label: "Yuqori", color: "#ef4444" },
};

export default function Chart() {
  const { diagnosticData } = useSelector((state) => state.todo);

  const dispatch = useDispatch();
  useEffect(() => {
    diagnosticTodo()
      .then(
        (res) => {
          dispatch(setDiagnostic(res));
        },
        ({ message }) => {
          toast.error(message);
        }
      )
      .finally(() => {});
  }, []);

  const priorityCounts = diagnosticData.reduce(
    (acc, item) => {
      if (item.priority === "low") acc.low += 1;
      else if (item.priority === "medium") acc.medium += 1;
      else if (item.priority === "high") acc.high += 1;
      return acc;
    },
    { low: 0, medium: 0, high: 0 }
  );

  const chartData = [
    { priority: "low", count: priorityCounts.low, fill: "#22c55e" },
    { priority: "medium", count: priorityCounts.medium, fill: "#facc15" },
    { priority: "high", count: priorityCounts.high, fill: "#ef4444" },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>To-do bo'yicha darajalar</CardTitle>
        <CardDescription>Yanvar - Iyun 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="priority" hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="priority">
              <LabelList
                dataKey="priority"
                formatter={(value) => chartConfig[value]?.label ?? value}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Darajalar bo'yicha umumiy xolat <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
