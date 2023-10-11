import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/core/services/login.service';
import { DashBoardAnalytics, DashBoardTableData } from '../../models/DashboardData';
import { MatPaginator } from '@angular/material/paginator';
import { PrivateApiService } from '../../Services/private-api.service';
import { Observable } from 'rxjs'
import { UserDetails } from '../../models/UserDetails';
import { Dialog } from '@angular/cdk/dialog';
import { CustomDashboardModalComponent } from '../custom-dashboard-modal/custom-dashboard-modal.componet'; 
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  ELEMENT_DATA: DashBoardTableData[] = [];
  formDropDown: string[] = ["All", "Survey", "Quiz", "Opinion", "Private Forms", "Public Forms", "Draft Forms"];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['formname', 'type', 'participants', 'status', 'startDate', 'endDate', 'share', 'delete'];
  dataLoaded: boolean = false;
  userName: string = "";
  userId: string = "";
  userDetails$! : Observable<UserDetails>;
  formAnalytics$!: Observable<DashBoardAnalytics>;

  constructor(private loginService: LoginService, private apiService: PrivateApiService,public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getUserInfo();
    this.getFormAnalytics();
    this.getTableData();
  }
  getFormAnalytics() {
    this.formAnalytics$ = this.apiService.getFormAnalytics(this.userId);
  }
  getTableData() {
    this.apiService.getUserFormDetails(this.userId,"N").subscribe({
      next: (res: DashBoardTableData[]) => {
        this.dataLoaded = true;
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  getUserInfo() {
    let userInfo: any = this.loginService.getLocalData("authData");
    this.userId = userInfo?.Response?.id;
    this.userDetails$ = this.apiService.getUserDetails(this.userId);
  }
  getLables(column: string) {
    switch (column) {
      case "formname": return "Forms";
      case "type": return "Type";
      case "participants": return "Participants";
      case "status": return "Status";
      case "startDate": return "StartDate";
      case "endDate": return "EndDate";
      default: break;
    }
    return '';
  }
  filterTable(value: string) {
    if (value === 'Survey' || value === 'Quiz' || value === 'Opinion') {
      this.dataSource.data = this.ELEMENT_DATA.filter((ele: DashBoardTableData) => ele.type === value);
      return;
    }
    if (value === "Private Forms" || value === "Public Forms" || value === "Draft Forms") {
      this.dataSource.data = this.ELEMENT_DATA.filter((ele: DashBoardTableData) => ele.status === value.split(" ")[0]);
      return;
    }
    this.dataSource.data = this.ELEMENT_DATA;
  }
  openDialog(formName : string, Id: string,modalType: string,formStatus = ""){
    console.log(modalType)
    const dialogRef = this.dialog.open(CustomDashboardModalComponent,{
      data: {formId:Id,formName: formName, modalType:modalType,formStatus:formStatus },
      minWidth: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.success){
        this.getTableData();
        this.getFormAnalytics();
      }
    });
    return;
  }
 

}
