import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BbqRecord } from '../BbqRecord.model';

/**
 * @title Basic use of `<table mat-table>`
 */
 @Component({
  selector: 'app-mytable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.css']
})

export class MytableComponent implements OnInit {
  http: HttpClient;
  serverData: Object | null;
  myDataSource !: BbqRecord[];  
  displayedColumns: string[] = ['GIHS', 'name', 'district', 'address','longitude','latitude', 'edit', 'delete'];
  dataSource = this.myDataSource;

  constructor(http: HttpClient) {
    this.http = http;
    this.serverData = null;
    this.myDataSource = [];
  }

  ngOnInit(): void {
    this.onload();
  }

  // custom funtion (fillData) added by wong ka chun
  fillData(arr: Object): void {
    this.serverData = arr;
    let objData = JSON.parse(JSON.stringify(arr));
    let serverDataArr = objData.data;
    console.log(serverDataArr.length);
    // bbq in serverDataArr for-loop should be referred to actual json object 
    // but not BbqRecord model
    for (let bbq of serverDataArr) {
      console.log(bbq.Name_en);
      let obj = {
        GIHS: bbq.GIHS,
        name: bbq.Name_en,
        district: bbq.District_en,
        address: bbq.Address_en,
        longitude: bbq.Longitude,
        latitude: bbq.Latitude
      }
      this.myDataSource.push(obj);
    }    
    this.dataSource = this.myDataSource;
  }

  // custom function (onload) added by wong ka chun
  onload(): void {
    let myurl = "http://localhost/ATWD_Project_2021/controller.php/dbinit";
    this.http.get(myurl).subscribe(
      {      
        next: (res) => {
          console.log(res);
          this.fillData(res);          
        },
        error: (err) => {
          console.log("Server call failed: " + err);
        }
      }
    );
  }

}





