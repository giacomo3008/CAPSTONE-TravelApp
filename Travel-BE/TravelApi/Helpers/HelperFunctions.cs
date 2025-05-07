using System;

namespace TravelApi.Helpers
{
    public class HelperFunctions
    {
        public static string GenerateRandomColor()
        {
            var random = new Random();
            string stringColor = "#";
            string[] arrayColor = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" };

            for (int i = 1; i <= 6; i++)
            {
                stringColor += arrayColor[random.Next(0, 15)];
            }
            return stringColor;
        }
    }
}

