```C#

﻿using NetworkHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace console_with_dll
{
    // az osztály tulajodonságainak megfelelő típusúnak és karakterpontosnak kell lenniük az adatbázis mezőivel
    public class User
    {
        public int id { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public DateTime birthday { get; set; }
    }
    class Program
    {
        static void Main(string[] args)
        {
            // ez a könyvtár annyival jobb a kézzel megírttól,
            // hogy akármilyen és bármennyi adatbázis táblával fog tudni kommunikálni
            // dinamikus, ez főleg a generatív programozási alapelveknek köszönhető
            // builder design patternre épül
            // lehetővé teszi a láncolt, egysoros programozást
            // ---------------------------------------------------------------
            // plusz tartalmaz egy Modify LINQ bővítményt is, ami lehetővé teszi, hogy egy sorba tudjunk móodítani egy vagy több értéket
            // pl:
            // User user = users.First().Modify(x => x.birthday = DateTime.Now);
            // vagy 
            // User user = users.First().Modify(x => { x.birthday = DateTime.Now; x.lastname = "bela"; });
            // enélkül a kiegészitő nélkül csak két vagy több sorban lehetne megvalósítani
            // pl:
            // User user = users.First();
            // user.birthday = DateTime.Now;
            // user.lastname = "bela";

            // backend route-ja
            string url = "http://localhost:3000/users";

            // alapműveletek:
            CREATE(url);
            READ(url);
            UPDATE(url);
            DELETE(url);

            Console.ReadKey();
        }

        private static void DELETE(string url)
        {
            Response deleteResponse = Backend.DELETE(url).Body(new User { id = 1 }).Send(); // törli azt a felhasználót akinek az id-ja 1
            Console.WriteLine(deleteResponse.Message); // vagy azt írja ki hogy 'hiba' vagy azt hogy 'sikeres törlés!'

            // ugyanez egysorosan:
            // Console.WriteLine(Backend.DELETE(url).Body(new User { id = 3 }).Send().Message);
        }

        private static void UPDATE(string url)
        {
            Response getResponse = Backend.GET(url).Send(); 
            User user = getResponse.ToList<User>().First(); // lekérjük a legeleső elemet a bacekendtől
            user.birthday = DateTime.Now; // módosítjuk az adatatát
            
            Response putValasz = Backend.PUT(url).Body(user).Send();
            Console.WriteLine(putValasz.Message); // vagy azt írja ki hogy 'hiba' vagy azt hogy 'sikeres módosítás!'

            // ugyanez egysorosan: (Modify az a saját könyvtárból jön)
            // Console.WriteLine(Backend.PUT(url).Body(Backend.GET(url).Send().ToList<User>().First().Modify(x => { x.birthday = DateTime.Now; x.lastname = "bela"; })).Send().Message);
        }

        private static void READ(string url)
        {
            Response getResponse = Backend.GET(url).Send(); // lekérjük az összes felhasználót
            List<User> users = getResponse.ToList<User>(); 
            users.ForEach(x => Console.WriteLine($"{x.id} {x.firstname} {x.lastname} {x.birthday.ToString("yyyy-MM-dd")}")); // kiíratjuk a sorokat

            // ugyanez egysorosan:
            // Backend.GET(url).Send().ToList<User>().ForEach(x => Console.WriteLine($"{x.id} {x.firstname} {x.lastname} {x.birthday.ToString("yyyy-MM-dd")}"));
        }

        private static void CREATE(string url)
        {
            User newUser = new User { firstname = "Teszt", lastname = "Elek", birthday = DateTime.Now, }; // készítettünk egy új felhasználót
            Response postResponse = Backend.POST(url).Body(newUser).Send();
            Console.WriteLine(postResponse.Message); // vagy azt írja ki hogy 'hiba' vagy azt hogy 'sikeres felvitel!'

            // ugyanez egysorosan
            // Console.WriteLine(Backend.POST(url).Body(new User { firstname = "Teszt", lastname = "Elek", birthday = DateTime.Now }).Send().Message);
        }
    }
}

```
