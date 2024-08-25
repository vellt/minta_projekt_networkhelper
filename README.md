### Komplex response

```json
{
    "message": "Sikeres lekérdezés",
    "status": "success",
    "data": [
        {
            "id": 1,
            "nev": "Kiss Péter",
            "osztaly": "9.A",
            "szuletesi_datum": "2007-05-12"
        },
        {
            "id": 2,
            "nev": "Nagy Anna",
            "osztaly": "10.B",
            "szuletesi_datum": "2006-08-23"
        },
        {
            "id": 3,
            "nev": "Szabó Márton",
            "osztaly": "11.C",
            "szuletesi_datum": "2005-01-15"
        }
    ]
}

```

### komplex responseból részleges adatkinyerés a `ValueAt`-al
```C#
using NetworkHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TanulokConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            string url = "http://localhost:3000/tanulok";
            List<Tanulo> tanulok= Backend.GET(url)
               .Send()
               .ValueAt(2)
               .As<List<Tanulo>>();

            // Listázd ki azokat a tanulókat, akik a 12.A osztályba járnak.
            tanulok.Where(x => x.osztaly == "12.A")
                .ToList()
                .ForEach(x => Console.WriteLine(x.nev));

            // Keresd meg a legidősebb tanulót a listában.
            string nev = tanulok.OrderByDescending(x => DateTime.Parse(x.szuletesi_datum))
                .First().nev;
            Console.WriteLine(nev);

            // Számold meg, hogy hány tanuló van osztályonként.
            tanulok.GroupBy(x => x.osztaly)
                .Select(x => new { osztaly = x.Key, db = x.Count() })
                .ToList()
                .ForEach(x => Console.WriteLine($"osztály: {x.osztaly}, db: {x.db}"));

            // Számold ki a tanulók átlagéletkorát.
            double atlag= tanulok.Select(x => DateTime.Now.Year - DateTime.Parse(x.szuletesi_datum).Year)
                .Average();
            Console.WriteLine(atlag);

            // Rendezd a tanulókat név szerint növekvő sorrendben.
            tanulok.OrderBy(x => x.nev)
                .ToList()
                .ForEach(x => Console.WriteLine(x.nev));

            Console.ReadKey();
        }
    }
}
```
