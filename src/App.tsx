import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import Logo from "./assets/Logo.png"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import WarfarinComponent from "./components/WarfarinComponent";
import AcitromComponent from "./components/AcitromComponent";

export default function App() {

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 md:px-12 py-12">
      <div className="space-y-8 mx-auto max-w-md sm:max-w-lg md:max-w-xl">

        <div className="flex items-center gap-3">
          <div className="size-9">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="text-blue-800 font-bold text-xl">Narayana Hrudayalaya</div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center font-bold text-2xl text-blue-800">Dose Calculator</CardTitle>
            <CardDescription className="text-center text-gray-600">Calculate the appropriate dose based on INR value</CardDescription>
          </CardHeader>

          <CardContent>

            <Tabs defaultValue="Warfarin Dose" className="w-full">
              <TabsList>
                <TabsTrigger value="Warfarin Dose">Warfarin Dose</TabsTrigger>
                <TabsTrigger value="Acitrom Dose">Acitrom Dose</TabsTrigger>
              </TabsList>
              <TabsContent value="Warfarin Dose" className="space-y-6">
                <WarfarinComponent />
              </TabsContent>
              <TabsContent value="Acitrom Dose" className="space-y-6">
                <AcitromComponent />
              </TabsContent>
            </Tabs>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}