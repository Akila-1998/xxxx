import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {ApiService} from "../services/api/api.service";

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  private adapter: Subscription | any;

  data: any
  diabeticData: any
  isBMICalculated: boolean = false
  isDiabeticPatient: boolean = false
  isSubmit: boolean = false

  patientForm = new FormGroup({
    pId : new FormControl('', [Validators.required]),
    pName : new FormControl('', [Validators.required]),
    bloodPressure : new FormControl('', [Validators.required]),
    glucose : new FormControl('', [Validators.required]),
    pregnancies : new FormControl('', [Validators.required]),
    skinThickness : new FormControl('', [Validators.required]),
    insulinLevel : new FormControl('', [Validators.required]),
    diabetic : new FormControl('', [Validators.required]),
    age : new FormControl('', [Validators.required]),
  })

  bmiForm = new FormGroup({
    height : new FormControl('', [Validators.required]),
    weight : new FormControl('', [Validators.required]),
  })

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  get patientId(){
    return this.patientForm.get('pId');
  }

  get patientName(){
    return this.patientForm.get('pName');
  }

  get bloodPressure(){
    return this.patientForm.get('bloodPressure');
  }

  get glucose(){
    return this.patientForm.get('glucose');
  }

  get pregnancies(){
    return this.patientForm.get('pregnancies');
  }

  get skinThickness(){
    return this.patientForm.get('skinThickness');
  }

  get insulinLevel(){
    return this.patientForm.get('insulinLevel');
  }

  get diabetic(){
    return this.patientForm.get('diabetic');
  }

  get age(){
    return this.patientForm.get('age');
  }

  get height(){
    return this.bmiForm.get('height');
  }

  get weight(){
    return this.bmiForm.get('weight');
  }

  calculate() {
    console.log("calculate working"); //todo:remove
    let formData = {
      height: this.bmiForm.value.height?.trim(),
      weight: this.bmiForm.value.weight?.trim(),
    }
    this.adapter = this.apiService.calculate(formData).subscribe(
      responce => {
        if (responce.bmi != null ) {
          this.data = responce.bmi.toFixed(2)
          this.isBMICalculated = true
        }


      },
      error => {

      }
    );

  }

  onSubmit() {
    console.log("onsubmit working"); //todo:remove
    let formData = {
      patient_id: this.patientForm.value.pId?.trim(),
      patient_name: this.patientForm.value.pName?.trim(),
      bloodpressure: this.patientForm.value.bloodPressure?.trim(),
      glucose: this.patientForm.value.glucose?.trim(),
      pregnancies: this.patientForm.value.pregnancies?.trim(),
      skinthickness: this.patientForm.value.skinThickness?.trim(),
      insulin: this.patientForm.value.insulinLevel?.trim(),
      diabetespedigreefunction: this.patientForm.value.diabetic?.trim(),
      age: this.patientForm.value.age?.trim(),
      bmi: this.data
    }

    this.isSubmit = true
    this.adapter = this.apiService.submit(formData).subscribe(
      response => {
        this.diabeticData = response
        if (response.message == "Diabetic") {
          this.isDiabeticPatient = true
        }



      },
      error => {

      }

    );



  }

  reset() {
    this.patientForm.reset()
    this.bmiForm.reset()
    this.data = ''
    this.diabeticData = ''
    this.isSubmit = false
  }
}
