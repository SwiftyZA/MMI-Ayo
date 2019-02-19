using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConversionAPI.Models
{
    public class ConversionRequest
    {
        public int TypeId { get; set; }
        public int FromUnitId { get; set; }
        public int ToUnitId { get; set; }
        public decimal Value { get; set; }
    }
}
