import { Injectable } from '@angular/core';
import { InvoiceModel } from './model/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  lstInvoices: InvoiceModel[] = [
    { Id: 1, InvoiceNumber: 'Inv_1', Amount: 2000, CreatedBy: 'Sreeram' },
    { Id: 2, InvoiceNumber: 'Inv_2', Amount: 5000, CreatedBy: 'Lasya' },
    { Id: 3, InvoiceNumber: 'Inv_3', Amount: 7000, CreatedBy: 'Divya' },
    { Id: 4, InvoiceNumber: 'Inv_4', Amount: 800, CreatedBy: 'RaviTeja' },
    { Id: 5, InvoiceNumber: 'Inv_5', Amount: 2000, CreatedBy: 'Sreeram' },
    { Id: 6, InvoiceNumber: 'Inv_6', Amount: 5000, CreatedBy: 'Lasya' },
    { Id: 7, InvoiceNumber: 'Inv_7', Amount: 7000, CreatedBy: 'Divya' },
    { Id: 8, InvoiceNumber: 'Inv_8', Amount: 800, CreatedBy: 'RaviTeja' }
  ];
  getInvoices(): InvoiceModel[] {
    return this.lstInvoices;
  }
  getInvoiceById(id: number): InvoiceModel {
    let invoiceDetail = this.lstInvoices.filter(x => x.Id == id)[0];
    return invoiceDetail;
  }
}
