import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { InvoiceModel } from '../model/invoice.model';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent {

  invoiceDetail: InvoiceModel;
  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) {
    route.paramMap.subscribe((param) => {
      //console.log(param);
      let id = param.get('id');
      this.invoiceDetail = this.invoiceService.getInvoiceById(id ? parseInt(id) : 0);
    });
  }

}
