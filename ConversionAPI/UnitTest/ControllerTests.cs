using ConversionAPI.Controllers;
using System.Linq;
using Xunit;

namespace UnitTest
{
    public class ControllerTests
    {
        [Fact]
        public void GetTypesTest()
        {
            var ctrl = new ConverterController();
            var results = ctrl.GetTypes().Value.ToList();

            Assert.True(results?.Any(), "Service returned no supported types");
            Assert.True(results.Count >= 90, "Service should have at least 90 supported types");
        }

        [Fact]
        public void GetUnitsTest()
        {
            var ctrl = new ConverterController();
            var results = ctrl.GetUnits(46).Value.ToList();

            Assert.True(results?.Any(), "Service returned no supported units");
        }

        [Fact]
        public void ConvertTest()
        {
            var ex = Record.Exception(() => {
                var ctrl = new ConverterController();
                var example = ctrl.GetExample().Value;

                var result = ctrl.Post(example);
            });

            Assert.Null(ex);
        }
    }
}
