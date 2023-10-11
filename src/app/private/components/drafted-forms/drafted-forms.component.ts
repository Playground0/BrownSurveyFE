import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DashBoardTableData, DraftedForm } from '../../models/DashboardData';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/core/services/login.service';
import { PrivateApiService } from '../../Services/private-api.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomDashboardModalComponent } from '../custom-dashboard-modal/custom-dashboard-modal.componet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drafted-forms',
  templateUrl: './drafted-forms.component.html',
  styleUrls: ['./drafted-forms.component.css']
})
export class DraftedFormsComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  ELEMENT_DATA: DraftedForm[] = [];
  // formDropDown : [] = []
  formDropDown : string[] = ["All","Survey","Quiz","Opinion"];
  dataSource! : MatTableDataSource<DraftedForm>;
  displayedColumns: string[] = ['formname', 'type', 'startDate','edit', 'delete'];
  userId: string = "";
  dataLoaded: boolean = false;

  constructor(private loginService : LoginService,private apiService: PrivateApiService,
    public dialog: MatDialog, private router: Router){}
  ngOnInit(): void {
    this.getUserInfo();
    this.loadTableData();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getUserInfo() {
    let userInfo: any = this.loginService.getLocalData("authData");
    this.userId = userInfo?.Response?.id;
  }
  loadTableData(){
    this.apiService.getUserFormDetails(this.userId,"Y").subscribe({
      next: (res: DraftedForm[]) => {
        this.dataLoaded = true;
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.dataLoaded = true;
      }
    });
  }
  filterTable(value: string) {
    if (value === 'Survey' || value === 'Quiz' || value === 'Opinion') {
      this.dataSource.data = this.ELEMENT_DATA.filter((ele: DraftedForm) => ele.type === value);
      return;
    }
    this.dataSource.data = this.ELEMENT_DATA;
  }
  getLables(column:string)
  {
    switch(column){
      case "formname" : return "Forms";
      case "type": return "Type";
      case "participants": return "Participants";
      case "status": return "Status";
      case "startDate": return "Start Date";
      case "endDate": return "EndDate";
      default : break;
    }
    return '';
  }
  openDialog(formName : string, Id: string,modalType: string,formStatus = ""){
    console.log(modalType)
    const dialogRef = this.dialog.open(CustomDashboardModalComponent,{
      data: {formId:Id,formName: formName, modalType:modalType,formStatus:formStatus },
      minWidth: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.success){
        this.loadTableData();
      }
    });
    return;
  }
  goToEdit(id:string,type:string){
    this.router.navigateByUrl(`/create/${type}/draft-edit/${id}`);
  }
}
