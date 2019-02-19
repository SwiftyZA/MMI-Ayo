using System;
using UnitsNet;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using ConversionService.Model;

namespace ConversionService
{
    public static class Converter
    {
        public static IEnumerable<ResultModel> GetSupportedTypes()
        {
            return Quantity.Infos.Select(x => new ResultModel() { Id = (int)x.QuantityType, Name = x.Name }).ToList();
        }

        public static IEnumerable<ResultModel> GetSupportedUnits(int typeId)
        {
            UnitInfo[] unitInfos = GetUnits(typeId);

            return unitInfos.Select(x => new ResultModel() { Name = x.Name, Id = Convert.ToInt32(x.Value) }).ToList();
        }

        public static double ConvertValue(decimal value, int typeId, int fromUnitId, int toUnitId)
        {
            UnitInfo[] unitInfos = GetUnits(typeId);

            var _fromUnit = unitInfos.FirstOrDefault(x => Convert.ToInt32(x.Value) == fromUnitId);

            var _toUnit = unitInfos.FirstOrDefault(x => Convert.ToInt32(x.Value) == toUnitId);

            if(_fromUnit == null)
                throw new Exception($"Invalid unit Id: {fromUnitId}");
            if (_toUnit == null)
                throw new Exception($"Invalid unit Id: {toUnitId}");

            return UnitConverter.Convert(value, _fromUnit.Value, _toUnit.Value);
        }

        private static UnitInfo[] GetUnits(int typeId)
        {
            if (!Enum.IsDefined(typeof(QuantityType), typeId))
                throw new Exception($"Invalid QuantityType Id: {typeId}");

            var quantityInfo = Quantity.GetInfo((QuantityType)typeId);
            return quantityInfo.UnitInfos;
        }
    }
}
