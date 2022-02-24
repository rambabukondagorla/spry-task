import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { InvoiceService } from "../invoice.service";
import { InvoiceModel } from "../model/invoice.model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})

export class InvoiceListComponent implements OnInit {
  p: number = 1;
  editIndex: number;
  modalTitle: string;
  alertMessage: string;
  listInvoices: InvoiceModel[];
  formData = new InvoiceModel();
  invoiceForm: any = new FormGroup({
    invoiceNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
    amount: new FormControl('', Validators.required),
    createdBy: new FormControl('', Validators.required),
  })
  constructor(private invoiceService: InvoiceService, private toastr: ToastrService) {

  }
  get invoiceNumber() {
    return this.invoiceForm.get('invoiceNumber');
  }
  get amount() {
    return this.invoiceForm.get('amount');
  }
  get createdBy() {
    return this.invoiceForm.get('createdBy');
  }
  saveInvoiceDetail() {
    if (this.formData.Id != null) {
      this.listInvoices[this.editIndex] = this.formData;
      this.toastr.success('Invoice updated successfully...');
    }
    else {
      this.formData.Id = this.listInvoices.length + 1;
      this.listInvoices.push(this.formData);
      this.toastr.success('Invoice saved successfully...');

    }
    this.formData = new InvoiceModel();
    this.invoiceForm.reset();
  }
  editInvoice(invoiceDetail: InvoiceModel, index: number) {
    this.alertMessage = '';
    this.formData = invoiceDetail;
    this.editIndex = index;
    this.modalTitle = "Update Invoice";
  }
  addInvoice() {
    this.alertMessage = '';
    this.formData = new InvoiceModel();
    this.invoiceForm.reset();
    this.modalTitle = "Add Invoice";
  }
  deleteInvoice(index: number) {
    if (confirm('Are you sure want to delete ?')) {
      this.listInvoices.splice(index, 1);
      this.toastr.success('Invoice deleted successfully...');
    }
  }
  ngOnInit(): void {
    this.listInvoices = this.invoiceService.getInvoices();
  }
}
