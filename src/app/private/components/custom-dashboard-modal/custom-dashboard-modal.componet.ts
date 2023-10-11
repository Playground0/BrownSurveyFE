import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PrivateApiService } from '../../Services/private-api.service';
import { PrivateCommonService } from '../../Services/private-common.service';

@Component({
  selector: 'app-custom-dashboard-modal',
  templateUrl: './custom-dashboard-modal.component.html',
  styleUrls: ['./custom-dashboard-modal.component.css']
})
export class CustomDashboardModalComponent implements OnInit {

  formName: string = "";
  formId: string = "";
  modalType: string = "";
  modalTitle: string = "";
  modalMessage: string = "";
  buttonText: string = "";
  shareUrl: string = "";
  formStatus: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: { formId: string, formName: string, modalType: string , formStatus:string},
    public dialogRef: MatDialogRef<CustomDashboardModalComponent>, private apiService: PrivateApiService,
    private apiCommon: PrivateCommonService) { }
  ngOnInit(): void {
    this.assignModalData();
    this.checkModalType(this.data.modalType);
  }
  assignModalData(){
    this.formName = this.data.formName;
    this.formId = this.data.formId;
    this.modalType = this.data.modalType;
    this.formStatus = this.data.formStatus;
  }
  checkModalType(modalType: string) {
    switch (modalType) {
      case "Delete": {
        this.modalTitle = "Delete Form";
        this.modalMessage = `<span>This will delete your form: <strong>${this.formName}</strong>, permanently.</span>`;
        this.buttonText = "Delete";
        break;
      }
      case "Share": {
        this.shareUrl = this.apiCommon.getClientUrl() + '/view-form/' + this.formId; 
        console.log(this.shareUrl);
        this.modalTitle = "Share Form";
        this.modalMessage = `
        <span>Copy the bellow url <br> <strong>${this.shareUrl}</strong></span>`;
        this.buttonText = "Copy to Clipoard";
        break;
      }
      case "Change Status": {
        this.modalTitle = "Check and Change Status";
        this.modalMessage = `<span>Current Status:  <strong>${this.formStatus} </strong></span><br>
        <span>This will change the form status to <strong>${this.formStatus === 'Private' ? 'Public' : 'Private'}</strong>.</span>`;
        this.buttonText = "Change Status";
        break;
      }
    }
  }
  goBack() {
    this.dialogRef.close();
  }
  performOperation() {
    switch (this.modalType) {
      case "Delete": {
        this.deleteForm();
        break;
      }
      case "Share": {
        this.shareForm();
        break;
      }
      case "Change Status": {
        this.changeStatus();
        break;
      }
    }
  }
  deleteForm() {
    this.apiService.deleteUserForm(this.formId).subscribe({
      next: (res) => {
        if (res) {
          this.dialogRef.close({ success: true });
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  shareForm() {
    navigator.clipboard.writeText(this.shareUrl);
    this.buttonText = "Copied to Clipoard";
  }
  changeStatus() {
    let newStatus = this.formStatus === "Private" ? "Public" : "Private";
    this.apiService.updateFormStatus(this.formId,newStatus).subscribe({
      next: (res) => {
        if(res){
          this.dialogRef.close({ success: true });
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
