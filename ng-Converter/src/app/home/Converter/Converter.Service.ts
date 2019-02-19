import { Injectable } from '@angular/core'
import { IServiceResult } from './ServiceResult';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IConversionRequest } from './ConversionRequest';

@Injectable()
export class ConverterService{
    private webApiUrl = "http://localhost:4200/api/Converter/";

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };

    private defaultItem: Observable<IServiceResult>;

    constructor(private http: HttpClient){
        //this.defaultItem.ps = this.getDefaultItem();
    }

    getDefaultItem(): IServiceResult{ 
        var item =
            {
                "id" : -1,
                "name" : "Please select",
            };

        return item;
    }

    getConversionRequestItem(): IConversionRequest{ 
        var item =
            {
                "FromUnitId": 0,
                "ToUnitId": 0,
                "TypeId": 0,
                "Value": 0,
            };

        return item;
    }



    getTypes(): Observable<IServiceResult[]> { 
        return this.http.get<IServiceResult[]>(this.webApiUrl + 'Types').pipe(
            //tap(data => console.log('All: ' + JSON.stringify(data)))
        );
    }

    getUnits(id): Observable<IServiceResult[]> { 
        return this.http.get<IServiceResult[]>(this.webApiUrl + id + '/Units').pipe(
            tap(data => console.log('All: ' + JSON.stringify(data)))
        );
    }

    doConversion(request: IConversionRequest): Observable<number> {
        
        var result = this.http.post<number>(this.webApiUrl + 'Convert', JSON.stringify(request), this.httpOptions);

        return result;
    }

    private handleError(err: HttpErrorResponse)
    {

        
    }
}