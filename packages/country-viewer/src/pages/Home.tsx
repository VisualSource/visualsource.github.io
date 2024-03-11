import { useQuery } from "@tanstack/react-query";
import { useDebounce } from 'use-debounce';
import { Search } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CountryCard, { type Country } from "@/components/CountyCard";
import { Input } from "@/components/ui/input";

const API_ROOT = "https://restcountries.com/v3.1/";

const getData = (region: string, query: string | undefined): string => {
    if (query && query.length > 1) {
        return `name/${query}`;
    }
    if (region !== "all") {
        return `region/${region.toLowerCase()}`;
    }

    return "all";
}

const StateHandler: React.FC<{ loading: boolean, error: boolean, data: Country[] | undefined }> = ({ loading, error, data }) => {
    if (loading) {
        return (<div className="col-span-4">Loading</div>)
    }
    if (error) {
        return (<div className="col-span-4">Failed to load counties</div>);
    }

    return (
        <>
            {data?.map((county, i) => <CountryCard country={county} key={i} />)}
        </>
    );
}

const Home: React.FC = () => {
    const [region, setRegion] = useState("all");
    const [search, setSearch] = useState<string>();
    const [value] = useDebounce(search, 1000);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["COUNTY_DATA", region, value], queryFn: async ({ queryKey }) => {
            const regionQuery = queryKey.at(1) ?? "all";
            const query = queryKey.at(2) ?? undefined;

            const route = getData(regionQuery, query);

            return fetch(`${API_ROOT}${route}`).then(e => e.json() as Promise<Country[]>);
        }
    });

    return (
        <div className="flex flex-col container">
            <nav className="flex flex-col gap-10 md:gap-0 md:flex-row md:justify-between py-14">
                <div className="md:w-2/6 h-10 flex items-center rounded-md show-ring shadow">
                    <div className="pl-3 py-2 border-l border-y border-input h-10 rounded-l-md bg-card">
                        <Search />
                    </div>
                    <Input className="w-full border-l-0 rounded-l-none focus-visible:ring-transparent focus-visible:ring-offset-0" onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Search for a country..." />
                </div>
                <Select onValueChange={(e) => setRegion(e)}>
                    <SelectTrigger className="w-[180px] shadow">
                        <SelectValue placeholder="Filter by Region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="africa">Africa</SelectItem>
                            <SelectItem value="america">America</SelectItem>
                            <SelectItem value="asia">Asia</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="oceania">Oceania</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </nav>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-row-none gap-10 md:gap-16 pb-14 px-10 md:p-0">
                <StateHandler loading={isLoading} error={isError} data={data} />
            </div>
        </div>
    );
}

export default Home;