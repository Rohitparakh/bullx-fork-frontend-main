import Deposit from "@/app/transfer/components/deposit";
import Withdraw from "@/app/transfer/components/withdraw";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

export default function CardsTabbed() {
  return (
    <Tabs defaultValue="deposit" className="w-full">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
      </TabsList>
      <TabsContent value="deposit"><div className="py-2"><Deposit /></div></TabsContent>
      <TabsContent value="withdraw"><div className="py-2"><Withdraw /></div></TabsContent>
    </Tabs>
  );
}
