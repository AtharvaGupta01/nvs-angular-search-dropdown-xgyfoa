import { Component, Input, HostListener, forwardRef,ElementRef, ViewChild} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
    selector: 'dropdown-search',
    template: `
  <div class="dropdown-search" [ngClass]="{'open':shown,'small':size=='small'}">
  <span class="dropdown-search-btn" (click)="show($event)">{{selected}}</span>
  <div class="dropdown-search-dropdown">
  <input type="text" placeholder="Search" [(ngModel)]="val" #searchfield (keyup)="search(val)"  />
   <div class="dropdown-search-scroller">
  <div class="dropdown-search-item" *ngFor="let item of list" (click)="select($event,item)"><span [style.background-image]="'url('+item.img+')'"></span>{{item.name}}</div>
  <div class="dropdown-search-404"  *ngIf="list.length == 0">No Result Found</div>
  </div>
    </div>
  </div>
  `,
    styles: [`
     *:before,*:after{
     box-sizing:border-box;
    }
    .dropdown-search{
        position:relative;
        font-family:sans-serif;
        width:200px;
        float:left
    }
    .dropdown-search .dropdown-search-btn{
       display:block;
       border:1px solid #ccc;
       background:white;
       height:38px;
       padding:0px 10px;
       line-height:38px;
       position:relative;
        text-transform:capitalize;
        cursor:pointer;
    }
    .dropdown-search .dropdown-search-btn:before{
        content:'';
        position:absolute;
        right:10px;
        top:50%;
       transform:translateY(-50%);
        border-left:5px solid transparent;
        border-right:5px solid transparent;
        border-top:5px solid #999;
     }
     .dropdown-search.open .dropdown-search-btn:before{
        border-top:0px;
        border-bottom:5px solid #999;
     }
  .dropdown-search.small .dropdown-search-btn{
      height:32px;
       line-height:32px;
     }
  
    .dropdown-search .dropdown-search-dropdown{
        position:absolute;
        top:100%;
        left:0px;
        width:100%;
        padding:0px 0px;
        background:white;
        border:1px solid #ccc;
        margin-top:-1px;
        z-index:9999;
        box-sizing:border-box;
        transition:all .3s ease;
        opacity:0;
        visibility:hidden;
    }
     .dropdown-search.open .dropdown-search-dropdown{
            opacity:1;
            visibility:visible;
     }
      .dropdown-search .dropdown-search-dropdown .dropdown-search-scroller{
        max-height:150px;
        overflow-y:auto;
      }
    .dropdown-search .dropdown-search-dropdown input[type=text]{
      width:100%;
      padding:5px 10px;
      line-height:20px;
      background:#f9f9f9;
      border:0px;
      border-bottom:1px solid #ccc;
      box-sizing:border-box;
    }
    .dropdown-search .dropdown-search-dropdown .dropdown-search-item{
        position:relative;
        padding:10px 20px;
        padding-left: 50px;
        text-transform:capitalize;
    }
    .dropdown-search .dropdown-search-dropdown .dropdown-search-item:hover{
        background:#f9f9f9;
        cursor:pointer;
    }
    .dropdown-search .dropdown-search-dropdown .dropdown-search-item span{
        position:absolute;
        top:50%;
        left:10px;
        margin-top:-15px;
        display:block;
        height:30px;
        width:30px;
        background-color:#ccc;
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;

    }
    .dropdown-search .dropdown-search-dropdown .dropdown-search-404{
       padding:5px 20px;
       text-align:center
    }
    `],
    host: {
        '(document:click)': 'onClick($event)'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownSearchComponent),
            multi: true
        }
    ]
})
export class DropdownSearchComponent implements ControlValueAccessor {
    templist = [];
    list = [];
    onChange: any = () => { }; 
    onTouch: any = () => { };
    val = "";
    shown = false;
    selected = 'Search';
    @Input('size') size;
    @ViewChild('searchfield',{static:false}) searchfield :ElementRef;
    @Input('items') set colors(val) {
        this.list = val;
        this.templist = val;
    };
    constructor(private ele:ElementRef){

    }
    show(e) {
      
        this.shown = this.shown ? false : true;
        this.val = '';
        this.search('');
        // console.log(this.searchfield.nativeElement);
        setTimeout(()=>{
          this.searchfield.nativeElement.focus();
        },200)
        
    }
    select(e, item) {
        this.selected = item['name'];
        this.shown = false;
        this.onChange(item['name']);
    }
    onClick(e) {
        if(!this.ele.nativeElement.contains(e.target)){
          this.shown = false;
        }
    }
    set value(val) {
        if (val !== undefined && this.val !== val) {
            this.val = val
            this.onChange(val)
            this.onTouch(val)
        }
    }
    writeValue(value: any) {
        this.value = value
    }
    registerOnChange(fn: any) {
        this.onChange = fn
    }
    registerOnTouched(fn: any) {
        this.onTouch = fn
    }
  
    search(e) {
        const val = e.toLowerCase();
        const temp = this.templist.filter(x => {
            if (x['name'].toLowerCase().indexOf(val) !== -1 || !val) {
                return x;
            }
        })
        this.list = temp;
    }
}
