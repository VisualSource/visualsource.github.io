import CountryCard, { type Country } from "@/components/CountyCard";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import ErrorComponent from "@/components/Error";
import Loading from "@/components/Loading";

const API_ROOT = "https://restcountries.com/v3.1/";

const getData = (region: string, query: string | undefined): string => {
    if (query && query.length > 1) {
        return `name/${query}`;
    }
    if (region !== "all") {
        return `region/${region.toLowerCase()}`;
    }

    return "all";
};

const StateHandler: React.FC<{
    loading: boolean;
    error: boolean;
    data: Country[] | undefined;
}> = ({ loading, error, data }) => {
    if (loading) {
        return (
            <div className="col-span-4 flex items-center justify-center py-8">
                <Loading />
                <span className="ml-4 text-2xl font-medium">Loading</span>
            </div>
        );
    }
    if (error) {
        return (
            <div className="col-span-4 h-full">
                <ErrorComponent
                    title="500"
                    subHeading="500"
                    errorMessage="Failed to load counties"
                />
            </div>
        );
    }

    return (
        <>{data?.map((county, i) => <CountryCard country={county} key={i} />)}</>
    );
};

const Home: React.FC = () => {
    const [region, setRegion] = useState("all");
    const [search, setSearch] = useState<string>();
    const [value] = useDebounce(search, 1000);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["COUNTY_DATA", region, value],
        queryFn: async ({ queryKey }) => {
            const regionQuery = queryKey.at(1) ?? "all";
            const query = queryKey.at(2) ?? undefined;

            const route = getData(regionQuery, query);

            return fetch(`${API_ROOT}${route}`).then(
                (e) => e.json() as Promise<Country[]>,
            );
        },
    });

    return (
        <div className="container flex flex-col">
            <nav className="flex flex-col gap-10 py-14 md:flex-row md:justify-between md:gap-0">
                <div className="show-ring flex h-10 items-center rounded-md shadow md:w-2/6">
                    <div className="h-10 rounded-l-md border-y border-l border-input bg-card py-2 pl-3">
                        <Search />
                    </div>
                    <Input
                        className="w-full rounded-l-none border-l-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        type="text"
                        placeholder="Search for a country..."
                    />
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
            <div className="grid-row-none grid grid-cols-1 gap-10 px-10 pb-14 sm:grid-cols-2 md:gap-16 md:p-0 md:pb-4 lg:grid-cols-3 xl:grid-cols-4">
                <StateHandler loading={isLoading} error={isError} data={data} />
            </div>
        </div>
    );
};

export default Home;
