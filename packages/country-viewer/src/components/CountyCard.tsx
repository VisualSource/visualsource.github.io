import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

export type Country = {
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
        common: string;
      };
    };
  };
  tld: string | string[];
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
  subregion: string;
  capital: string[];
  region: string;
  borders: string[];
  population: number;
  flag: string;
  ccn3: string;
  flags: {
    png: string;
    svg: string;
  };
};

const CountryCard: React.FC<{ country: Country }> = ({ country }) => {
  return (
    <Link to={`/view/${country.ccn3}`}>
      <Card>
        <div className="relative h-48">
          <img
            src={country.flags.svg}
            alt={country.flag}
            className="h-full w-full rounded-t-md object-cover shadow"
          />
        </div>
        <CardContent className="space-y-1 pb-8 pt-6">
          <h2 className="scroll-m-20 pb-3 text-lg font-bold tracking-tight">
            {country.name.common}
          </h2>
          <p className="text-sm">
            Population:{" "}
            <span className="text-muted-foreground">
              {country.population.toLocaleString()}
            </span>
          </p>
          <p className="text-sm">
            Region:{" "}
            <span className="text-muted-foreground">{country.region}</span>
          </p>
          <p className="text-sm">
            Capital:{" "}
            <span className="text-muted-foreground">
              {country?.capital?.at(0) ?? "Unknown"}
            </span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CountryCard;
