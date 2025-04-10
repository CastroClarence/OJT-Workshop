import NavBar from "../components/Navbar";
import LineChart from "../components/LineChart";
import KpiCard from "../components/KpiCard";

const Dashboard = () => {
    return (
        <div className="max-h-full">
            <NavBar />
            <div className="flex flex-col gap-5 p-5 h-full  w-full">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div>
                    <KpiCard title="Philippines" content="900,000" desc="hello" />
                </div>
                <LineChart />
            </div>
        </div>
    )
}
export default Dashboard;