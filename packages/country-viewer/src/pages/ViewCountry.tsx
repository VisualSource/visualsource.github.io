import { Link, type To, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Country } from "@/components/CountyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Boarder = Pick<Country, "name" | "ccn3">;

const CountyBoarders: React.FC<{ borders: string | undefined }> = ({ borders }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["COUNTY_BOARDS", borders], enabled: !!borders, queryFn: async ({ queryKey }) => {
            return fetch(`https://restcountries.com/v3.1/alpha?codes=${queryKey.at(1)}&fields=name,ccn3`).then(e => e.json() as Promise<Boarder[]>)
        }
    });

    if (isLoading || isError || !data) return (<></>);


    return (<div className="flex flex-wrap gap-2">
        {data.map(value => (<Link to={`/view/${value.ccn3}`}><Badge className="rounded-md bg-card" variant="outline" key={value.ccn3}>{value.name.common}</Badge></Link>))}
    </div>);
}

const ViewCountry: React.FC = () => {
    const { id } = useParams();
    const { data, isError, isLoading } = useQuery({
        queryKey: ["COUNTY", id], enabled: !!id, queryFn: async ({ queryKey }) => {
            const ccn3 = queryKey.at(1);
            if (!ccn3) throw new Error(`Failed to load county with ccn3 of '${ccn3}'`);

            const countuy = await fetch(`https://restcountries.com/v3.1/alpha/${ccn3}`).then(e => e.json() as Promise<Country[]>);

            const data = countuy.at(0);
            if (!data) throw new Error("Failed to find county");

            return data;
        }
    });


    if (isError || isLoading) return (<>Loading</>);

    return (
        <div className="h-full container flex flex-col pb-6">
            <div className="h-36 flex flex-col justify-center items-start">
                <Button size="sm" className="shadow" variant="card" asChild>
                    <Link to={-1 as To}>
                        <ArrowLeft className="h-6 w-6 mr-1" /> Back
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-none gap-10 md:gap-20">
                <section className="flex">
                    <div className="relative w-full h-60 md:h-96">
                        <img className="h-full w-full object-cover" src={data?.flags.svg} alt={data?.flag} />
                    </div>
                </section>
                <section className="flex flex-col justify-center">
                    <div className="flex flex-col p-4 space-y-4">
                        <h1 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight">{data?.name.common}</h1>
                        <div className="flex flex-col gap-12 md:gap-0 md:flex-row md:justify-between">
                            <div className="space-y-2">
                                <p><span className="font-semibold">Native Name:</span> <span className="text-muted-foreground">{Object.values(data?.name.nativeName ?? {}).at(-1)?.common}</span></p>
                                <p><span className="font-semibold">Population:</span> <span className="text-muted-foreground">{data?.population.toLocaleString()}</span></p>
                                <p><span className="font-semibold">Region:</span> <span className="text-muted-foreground">{data?.region}</span></p>
                                <p><span className="font-semibold">Sub Region:</span> <span className="text-muted-foreground">{data?.subregion}</span></p>
                                <p><span className="font-semibold">Capital:</span> <span className="text-muted-foreground">{data?.capital?.at(0)}</span></p>
                            </div>
                            <div className="space-y-2">
                                <p><span className="font-semibold">Top Level Domain:</span> <span className="text-muted-foreground">{data?.tld}</span></p>
                                <p><span className="font-semibold">Currencies:</span> <span className="text-muted-foreground">{Object.values(data?.currencies ?? {}).map(value => value.name).join(", ")}</span></p>
                                <p><span className="font-semibold">Languaes:</span> <span className="text-muted-foreground text-wrap">{Object.values(data?.languages ?? {}).join(", ")}</span></p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-10">
                            <h3 className="font-semibold mr-1">Boarder Countries:</h3>
                            <CountyBoarders borders={data?.borders ? data?.borders.join(",") : undefined} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ViewCountry;