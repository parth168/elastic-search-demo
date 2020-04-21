import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { allUsersDetail,deleteUSer,updateUser,getOneById,addUser } from '../response';
import { FormBuilder,FormGroup,Validators } from '@angular/forms'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userSearvice : UserService,
    private toastr : ToastrService,
    private formBuilder: FormBuilder
  ) { }

  form: FormGroup;
  loading:boolean = false;
  submitButton:boolean = false;
  submitted:boolean = false;
  showForm:boolean = false;

  data = [];
  totalPage: any;
  totalUser: number;
  totalPageArray: any;
  search : string ='';
  currentPage: number = 1;
  perPageData: number = 10;
  sortBy:string = '';
  sortorder:number = 0;

  ngOnInit(): void {
    this.userSearvice.getAll(this.search,this.currentPage,this.perPageData,this.sortBy,this.sortorder)
          .subscribe(
            (data: allUsersDetail)=>{
              if(data.code == 200){
                this.totalUser = data.data.hits.total.value;
                this.totalPage = this.totalUser/this.perPageData;
                if(this.totalPage > parseInt(this.totalPage))
                {
                  this.totalPage = parseInt(this.totalPage)+1;
                }
                this.totalPageArray = new Array(this.totalPage);
                this.data = data.data.hits.hits;
              }
              else{
                this.toastr.error(data.message);
              }
            },
            (error: HttpErrorResponse)=>{
              this.toastr.error(error.error.message);
            }
          );
          this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            mobile: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            district: ['', Validators.required],
            pincode: ['', Validators.required],
            addressline: ['', Validators.required]
          });
  }


  get f() { return this.form.controls; }

  searchByInput(){
    this.currentPage = 1;
    this.userSearvice.getAll(this.search,1,this.perPageData,this.sortBy,this.sortorder)
    .subscribe(
      (data: allUsersDetail)=>{
        if(data.code == 200){
          this.totalUser = data.data.hits.total.value;
          this.totalPage = this.totalUser/10;
          if(this.totalPage > parseInt(this.totalPage))
          {
            this.totalPage = parseInt(this.totalPage)+1;
          }
          this.totalPageArray = new Array(this.totalPage);
          this.data = data.data.hits.hits;
        }
        else{
          this.toastr.error(data.message);
        }
      },
      (error: HttpErrorResponse)=>{
        this.toastr.error(error.error.message);
      }
    );
  }

  sortOrderName:number = -1;
  sortByName(){
    this.sortBy = 'name';
    if(this.sortOrderName == 1){
      this.sortOrderName = -1;
      this.sortorder = -1;
    }
    else{
      this.sortOrderName = 1;
      this.sortorder = 1;
    }
    this.sort();
  }
  
  sortOrderEmail:number = -1;
  sortByEmail(){
    this.sortBy = 'email';
    if(this.sortOrderEmail == 1){
      this.sortOrderEmail = -1;
      this.sortorder = -1;
    }
    else{
      this.sortOrderEmail = 1;
      this.sortorder = 1;
    }
    this.sort();
  }

  sortOrderMobile:number = -1;
  sortByCity(){
    this.sortBy = 'mobile';
    if(this.sortOrderMobile == 1){
      this.sortOrderMobile = -1;
      this.sortorder = -1;
    }
    else{
      this.sortOrderMobile = 1;
      this.sortorder = 1;
    }
    this.sort();
  }

  sort(){
    this.userSearvice.getAll(this.search,this.currentPage,this.perPageData,this.sortBy,this.sortorder)
          .subscribe(
            (data:allUsersDetail)=>{
              if(data.code == 200){
                this.data = data.data.hits.hits;
              }
              else{
                this.toastr.error(data.message);
              }
            },
            (error:HttpErrorResponse)=>{
              this.toastr.error(error.error.message);
            }
          );
  }

  addNewUser(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      pincode: ['', Validators.required],
      addressline: ['', Validators.required]
    });
    this.showForm = true;
  }

  updateForm:boolean = false;
  id:string;
  updateUser(id:string){
    this.userSearvice.getOneById(id)
          .subscribe(
            (user:getOneById)=>{
              if(user.code == 200){
                this.form = this.formBuilder.group({
                  name: [user.data._source.full_name, Validators.required],
                  email: [user.data._source.email, Validators.required],
                  mobile: [user.data._source.mobile_number, Validators.required],
                  country: [user.data._source.address.country, Validators.required],
                  state: [user.data._source.address.state, Validators.required],
                  district: [user.data._source.address.district, Validators.required],
                  pincode: [user.data._source.address.pin_code, Validators.required],
                  addressline: [user.data._source.address.address_line, Validators.required]
                });
                this.showForm = true;
                this.updateForm = true;
                this.id = id;
              }
              else{
                this.toastr.error(user.message);
              }
            },
            (error:HttpErrorResponse)=>{
              this.toastr.error(error.error.message);
            }
          );
  }

  deleteUser(id:string){
    this.userSearvice.deleteUser(id)
          .subscribe(
            (data:deleteUSer)=>{
              if(data.code == 200){
                this.data = this.data.filter((user)=>{
                  return user._id != id;
                });
                this.toastr.success(data.message);
                this.totalUser =  this.totalUser-1;
                this.totalPage = this.totalUser/10;
                if(this.totalPage > parseInt(this.totalPage))
                {
                  this.totalPage = parseInt(this.totalPage)+1;
                }
                this.totalPageArray = new Array(this.totalPage);
              }
              else{
                this.toastr.error(data.message);
              }
            },
            (error: HttpErrorResponse)=>{
              this.toastr.error(error.error.message);
            }
          );
  }

  changepage(page: number){
    this.currentPage = page;
    this.userSearvice.getAll(this.search,page,this.perPageData,this.sortBy,this.sortorder)
    .subscribe(
      (data: allUsersDetail)=>{
        if(data.code == 200){
          this.data = data.data.hits.hits;
        }
        else{
          this.toastr.error(data.message);
        }
      },
      (error: HttpErrorResponse)=>{
        this.toastr.error(error.error.message);
      }
    );
  }

  onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    let formValue = this.form.value;
    if(this.updateForm){
      this.userSearvice.updateUSer(this.id,formValue)
            .subscribe(
              (newData:updateUser)=>{
                if(newData.code == 200){
                  location.reload();
                }
                else{
                  console.log(newData);
                  this.toastr.error(newData.message);
                }
              },
              (error: HttpErrorResponse)=>{
                this.toastr.error(error.error.message);
              }
            );
    }
    else{
      this.userSearvice.addUser(formValue)
            .subscribe(
              (newUser:addUser)=>{
                if(newUser.code == 200){
                  location.reload();
                }
              },
              (error: HttpErrorResponse)=>{
                this.toastr.error(error.error.message);
              }
            );
    }
  }

  cancel(){
    this.showForm = false;
  }
}
