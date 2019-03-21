import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IPosition } from './../../../shared/interfaces';
import { PositionsService } from './../../../shared/services/positions.service';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialService, IMaterialInstance } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;
  modal: IMaterialInstance;
  form: FormGroup;
  positions: IPosition[] = [];
  loading = false;

  constructor(private positionsService: PositionsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    });

    this.loading = true;
    this.positionsService.fetch(this.categoryId)
      .subscribe(positions => {
        this.positions = positions;
        this.loading = false;
      });
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef.nativeElement);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  onSelectPosition(position: IPosition) {
    this.modal.open();
  }

  onDeletePosition(position: IPosition) {

  }

  onAddPosition() {
    this.modal.open();
  }

  onCancel() {
    this.modal.close();
  }

  onSubmit() {
    this.form.disable();
  }

}
