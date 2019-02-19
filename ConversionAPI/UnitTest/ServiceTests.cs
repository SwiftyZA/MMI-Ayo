using ConversionService;
using System;
using System.Linq;
using Xunit;

namespace UnitTest
{
    public class ServiceTests
    {
        [Fact]
        public void SupportedTypesTest()
        {
            var result = Converter.GetSupportedTypes().ToList();
            Assert.True(result?.Any(), "Service returned no supported types");
            Assert.True(result.Count >= 90, "Service should have at least 90 supported types");
        }

        [Fact]
        public void LengthSpotCheckTest()
        {
            int lengthTypeId = 46;
            int centimeterUnitId = 1;
            int inchUnitId = 7;
            int value = 15;
            var serviceResult = Math.Round(Converter.ConvertValue(value, lengthTypeId, centimeterUnitId, inchUnitId), 4);
            var calculatedResult = Math.Round(CentimetersToInches(value), 4);

            Assert.Equal(calculatedResult, serviceResult);
        }

        [Fact]
        public void RandomizedTest()
        {
            var ex = Record.Exception(() => InternalRandomizedTest());
            Assert.Null(ex);
        }

        private double CentimetersToInches(int value)
        {
            return value * 0.3937007874;
        }

        private void InternalRandomizedTest()
        {
            Random rng = new Random();
            var types = Converter.GetSupportedTypes().ToList();

            var type = types[rng.Next(types.Count)];

            var units = Converter.GetSupportedUnits(type.Id).ToList();

            var fromUnit = units[rng.Next(units.Count)];
            var toUnit = units[rng.Next(units.Count)];

            var valueToConvert = rng.Next(99999999);

            var result = Converter.ConvertValue(valueToConvert, type.Id, fromUnit.Id, toUnit.Id);
        }
    }
}
