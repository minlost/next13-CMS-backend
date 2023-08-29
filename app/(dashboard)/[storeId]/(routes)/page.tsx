import { getGraphRevenue } from "@/actions/GetGraphRevenue"
import { getSalesCount } from "@/actions/GetSalesCount"
import { getStockCount } from "@/actions/GetStockCount"
import { getTotalRevenue } from "@/actions/GetTotalRevenue"
import Heading from "@/components/heading/Heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { db } from "@/lib/client/prismaDb"
import { priceFormatter } from "@/lib/formaters/priceFormatter"
import { CalendarDays, CreditCard, DollarSign, Package } from "lucide-react"
import { FC } from "react"
import { Overview } from "@/components/overview/Overview"
import { getTodaySales } from "@/actions/GetTodaySales"

interface DashboardPageProps {
  params: {
    storeId: string
  }
}

const DashboardPage: FC<DashboardPageProps> = async ({ params }) => {
  const store = await db.store.findUnique({
    where: { id: params.storeId },
  })

  const totalRevenue = await getTotalRevenue(params.storeId)
  const graphRevenue = await getGraphRevenue(params.storeId)
  const salesCount = await getSalesCount(params.storeId)
  const stockCount = await getStockCount(params.storeId)
  const todaySales = await getTodaySales(params.storeId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Přehled eshopu" />
        <Separator />
        <div className="grid gap-4 grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Celkový obrat
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {priceFormatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Objednávky</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Produkty skladem
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Dnešní prodeje{" "}
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{todaySales} </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Přehled</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
