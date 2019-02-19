import {Component, OnInit} from '@angular/core'
import { IServiceResult } from './ServiceResult';
import { ConverterService } from './Converter.Service';

@Component({
    selector: 'converter-converter',
    templateUrl: './Converter.component.html',
    providers: [ConverterService]
})
export class ConverterComponent implements OnInit{
    private _measurementType = "Measurement Type";
    private _fromUnit = "From Unit";
    private _toUnit = "To Unit";
    private _convertValue = 0;
    private _convertedValueLabel = "Converted Value";
    private _convertedValue = 0;
    
    public get convertedValueLabel() {
        return this._convertedValueLabel;
    }

    public get convertedValue() {
        return this._convertedValue;
    }
    public set convertedValue(value) {
        this._convertedValue = value;
        console.log(this._convertedValue);
    }

    public get convertValue() {
        return this._convertValue;
    }
    public set convertValue(value) {
        this._convertValue = value;
        this.doConversion();
        console.log(this.convertValue);
    }

    public get toUnit() {
        return this._toUnit;
    }

    public get fromUnit() {
        return this._fromUnit;
    }

    public get measurementType() {
        return this._measurementType;
    }

    public isEnabled(id: string) {
        if(id == "-1")
        {
            return "disabled"
        }
        else
        {
            return "";
        }
    }

    public get showToSelect() {
        return this.selectedFromUnit && this.selectedFromUnit.id !== -1;
    }

    public get showFromSelect() {
        return this.selectedType && this.selectedType.id !== -1;
    }

    public get showConversionValue() {
        return this.selectedToUnit && this.selectedToUnit.id !== -1;
    }

    constructor(private converterService: ConverterService){
    }

    public typeList: IServiceResult[];
    public unitList: IServiceResult[];
    public selectedType = null;
    public selectedFromUnit = null;
    public selectedToUnit = null;
    
    public onTypesSelected()
    {
        this.selectedFromUnit = null;
        this.selectedToUnit = null;
        this.converterService.getUnits(this.selectedType.id)
            .subscribe((unitList: IServiceResult[]) => { 
            if(unitList)
            {
                unitList.push(this.converterService.getDefaultItem())
                unitList.sort(x => x.id);
                this.unitList = unitList; 

                this.selectedFromUnit = this.unitList.find(x => x.id === -1);
                this.selectedToUnit = this.unitList.find(x => x.id === -1);
            }
        });
        console.log(this.selectedType);
    }

    private doConversion()
    {
        if(!this.convertValue)
            return;
        var request = this.converterService.getConversionRequestItem();
        request.FromUnitId = this.selectedFromUnit.id;
        request.ToUnitId = this.selectedToUnit.id;
        request.TypeId = this.selectedType.id;
        request.Value = this.convertValue;
        
        this.converterService.doConversion(request)
        .subscribe((value: number) =>{
            if(value)
            {
                this.convertedValue = value;
            }
        });

    }

    ngOnInit(): void {
        console.log('In OnInit');
        this.converterService.getTypes()
        .subscribe((typeList: IServiceResult[]) => { 
            if(typeList)
            {
                typeList.push(this.converterService.getDefaultItem())
                typeList.sort(x => x.id);
                this.typeList = typeList; 

                this.selectedType = this.typeList.find(x => x.id === -1);
            }
        });
    }
}