import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setFilter, setLogOut } from "../lib/redux-toolkit/slices/todo-slice";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { LucideDelete, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import Chart from "./Chart";
import { toast } from "sonner";


export default function Header({ handleClick }) {
  const dispatch = useDispatch();
  function handleFilter(priority) {
    dispatch(setFilter({ priority }));
  }

  function handleLogOut(){
   const user= JSON.parse(localStorage.getItem("user"))
   if(user){
    dispatch(setLogOut(null))
    toast.success("Malumotingiz Muvafaqqiyatli O'chirildi Broo ✅")
   }else{
    toast.info("Malumotingiz Saqlanmagan ❌")
   }
   
  }

  return (
    <header className="py-5 shadow-md fixed left-0 right-0 bg-white">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <h1 className="font-medium text-3xl">Todo app</h1>
        <div className="flex items-center gap-5">
          <strong>Daraja bo'yicha filterlash:</strong>
          <Select onValueChange={handleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Daraja bo'yicha filterlash" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medium">O'rta</SelectItem>
              <SelectItem value="high">Yuqori</SelectItem>
              <SelectItem value="low">Quyi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleClick}>
            <PlusCircle />
            New
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Diagnostic</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <Chart />
            </DialogContent>
          </Dialog>
          <Button variant={"destructive"}
            onClick={handleLogOut}
          >
            <LucideDelete/>
            Log Out
          </Button>
        </div>
      </div>
    </header>
  );
}
