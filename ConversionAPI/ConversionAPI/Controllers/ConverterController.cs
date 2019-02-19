using System.Collections.Generic;
using System.Linq;
using ConversionAPI.Models;
using ConversionService.Model;
using Microsoft.AspNetCore.Mvc;

namespace ConversionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConverterController : ControllerBase
    {
        [HttpGet]
        [Route("Types")]
        public ActionResult<IEnumerable<ResultModel>> GetTypes()
        {
            return ConversionService.Converter.GetSupportedTypes().ToArray();
        }

        [HttpGet]
        [Route("{typeId}/Units")]
        public ActionResult<IEnumerable<ResultModel>> GetUnits(int typeId)
        {
            return ConversionService.Converter.GetSupportedUnits(typeId).ToArray();
        }

        [HttpPost]
        [Route("Convert")]
        public double Post(ConversionRequest request)
        {
            return ConversionService.Converter.ConvertValue(request.Value, request.TypeId, request.FromUnitId, request.ToUnitId);
        }

        [HttpGet]
        [Route("Example")]
        public ActionResult<ConversionRequest> GetExample()
        {
            ConversionRequest request = new ConversionRequest();

            request.FromUnitId = 1;
            request.ToUnitId = 2;
            request.TypeId = 3;
            request.Value = 4;

            return request;
        }
    }
}
