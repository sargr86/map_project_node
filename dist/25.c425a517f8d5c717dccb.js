(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{Nt43:function(e,t,n){"use strict";n.r(t),n.d(t,"CompaniesModule",(function(){return M}));var o=n("Valr"),i=n("DUip"),a=n("9xib"),r=n("TYT/"),c=n("Ukt7"),p=function(){function e(e){this._companies=e,this.displayedColumns=["name","partner_type","actions"]}return e.prototype.ngOnInit=function(){this.companies=this._companies.get()},e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](a.a))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-show-companies"]],decls:5,vars:3,consts:[[1,"formTitle"],[1,"fa","fa-briefcase","title-sign"],[3,"dataObs","cols","item"]],template:function(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"h4",0),r["\u0275\u0275element"](1,"i",1),r["\u0275\u0275elementStart"](2,"span"),r["\u0275\u0275text"](3,"Companies"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](4,"app-mat-table",2)),2&e&&(r["\u0275\u0275advance"](4),r["\u0275\u0275property"]("dataObs",t.companies)("cols",t.displayedColumns)("item","companies"))},directives:[c.a],styles:[""]}),e}(),m=n("QJY3"),s=n("SqD4"),d=n("7dP1"),l=n("wobg"),u=n("oUVn"),f=n("nROc"),g=n("GsDI"),y=n("p+mS");function h(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"option",21),r["\u0275\u0275text"](1),r["\u0275\u0275elementEnd"]()),2&e){var n=t.$implicit;r["\u0275\u0275property"]("value",n.id),r["\u0275\u0275advance"](1),r["\u0275\u0275textInterpolate"](n.name)}}var C=function(){function e(e,t,n,o,i,a,r,c){this._fb=e,this._partner=t,this._company=n,this.router=o,this.route=i,this.auth=a,this._formMsg=r,this.common=c,this.editCase=!1,this.redirectUrl="admin/companies/show",this.fields={name:["",m.x.required],type_id:["",m.x.required]},this.subscriptions=[]}return e.prototype.ngOnInit=function(){var e=this;this.companyForm=this._fb.group(this.fields),this.subscriptions.push(this.route.data.subscribe((function(t){e.route.snapshot.paramMap.get("id")&&(e.editCase=!0),e.editCase&&(e.fields.id=[""],e.companyForm=e._fb.group(e.fields),e.companyForm.patchValue(t.company)),e.common.dataLoading=!1}))),this.subscriptions.push(this._partner.getTypes().subscribe((function(t){e.companyTypes=t})))},e.prototype.saveCompany=function(){var e=this;this.subscriptions.push(this._company[this.editCase?"update":"add"](this.companyForm.value).subscribe((function(){e.router.navigate([e.redirectUrl]),e._formMsg.transform("company",e.editCase,e.redirectUrl)})))},e.prototype.ngOnDestroy=function(){this.subscriptions.forEach((function(e){return e.unsubscribe()}))},e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](m.d),r["\u0275\u0275directiveInject"](s.a),r["\u0275\u0275directiveInject"](a.a),r["\u0275\u0275directiveInject"](i.d),r["\u0275\u0275directiveInject"](i.a),r["\u0275\u0275directiveInject"](d.a),r["\u0275\u0275directiveInject"](l.a),r["\u0275\u0275directiveInject"](u.a))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-save-company"]],decls:37,vars:4,consts:[[1,"companyForm"],[1,"left-wrap"],[3,"item","editCase"],[3,"formGroup"],[1,"input-wrap"],[1,"input"],["type","text","placeholder","First Name"],["type","text","placeholder","Last Name"],[1,"select"],["name","","id",""],["value",""],["type","text","placeholder","Email"],["type","text","placeholder","Phone Number"],["type","text","placeholder","Company Name","formControlName","name"],["id","company-type","formControlName","type_id"],["value","","selected","","disabled",""],[3,"value",4,"ngFor","ngForOf"],["name","","id","company-description","cols","30","rows","6","placeholder","Description"],["type","button",1,"backBtn",3,"click"],["mat-raised-button","","color","primary",1,"saveBtn",3,"click"],[1,"right-wrap"],[3,"value"]],template:function(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"div",0),r["\u0275\u0275elementStart"](1,"div",1),r["\u0275\u0275element"](2,"app-form-title",2),r["\u0275\u0275elementStart"](3,"form",3),r["\u0275\u0275elementStart"](4,"div",4),r["\u0275\u0275elementStart"](5,"div",5),r["\u0275\u0275element"](6,"input",6),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](7,"div",5),r["\u0275\u0275element"](8,"input",7),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](9,"div",8),r["\u0275\u0275elementStart"](10,"select",9),r["\u0275\u0275elementStart"](11,"option",10),r["\u0275\u0275text"](12,"Gender"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](13,"option",10),r["\u0275\u0275text"](14,"option"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](15,"option",10),r["\u0275\u0275text"](16,"option"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](17,"div",5),r["\u0275\u0275element"](18,"input",11),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](19,"div",5),r["\u0275\u0275element"](20,"input",12),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](21,"div",5),r["\u0275\u0275element"](22,"input",13),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](23,"div",8),r["\u0275\u0275elementStart"](24,"select",14),r["\u0275\u0275elementStart"](25,"option",15),r["\u0275\u0275text"](26,"Type"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](27,h,2,2,"option",16),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](28,"div",5),r["\u0275\u0275element"](29,"textarea",17),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](30,"button",18),r["\u0275\u0275listener"]("click",(function(){return t.router.navigate([t.redirectUrl])})),r["\u0275\u0275elementStart"](31,"mat-icon"),r["\u0275\u0275text"](32,"arrow_back"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](33,"button",19),r["\u0275\u0275listener"]("click",(function(){return t.saveCompany()})),r["\u0275\u0275text"](34," Save "),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](35,"div",20),r["\u0275\u0275text"](36," Add photo "),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e&&(r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("item","company")("editCase",t.editCase),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("formGroup",t.companyForm),r["\u0275\u0275advance"](24),r["\u0275\u0275property"]("ngForOf",t.companyTypes))},directives:[f.a,m.z,m.p,m.h,m.s,m.y,m.b,m.o,m.g,m.w,o.k,g.a,y.b],styles:[".companyForm[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;max-width:700px;width:100%;margin:0 auto}.companyForm[_ngcontent-%COMP%]   .left-wrap[_ngcontent-%COMP%]{flex:1}.companyForm[_ngcontent-%COMP%]   .right-wrap[_ngcontent-%COMP%]{flex:0 0 246px;margin-left:24px}.companyForm[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]{margin-top:24px}.companyForm[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]{margin-bottom:16px}.companyForm[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .companyForm[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{width:100%;background:#f9f9f9;padding:12px 23px;font-size:16px;color:#707070;border:.5px solid transparent}.companyForm[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .companyForm[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus{border:.5px solid #7bc447}.companyForm[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%]{padding-right:12px;margin-bottom:16px}.companyForm[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;padding:12px 16px;background:#f9f9f9;font-size:16px;color:#707070;border:.5px solid transparent}.companyForm[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus{border:.5px solid #7bc447}.companyForm[_ngcontent-%COMP%]   .saveBtn[_ngcontent-%COMP%]{float:left;background:#7bc447;border-radius:0;box-shadow:none;padding:4px 16px;font-size:16px;font-weight:700}"]}),e}(),_=function(){function e(e){this._companies=e}return e.prototype.resolve=function(e,t){return this._companies.getOne({id:e.params.id})},e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275inject"](a.a))},e.\u0275prov=r["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e}(),v=n("dpbs"),b=[{path:"",component:p,canActivate:[n("o5H1").a]},{path:"show",component:p},{path:"add",component:C},{path:":id",component:C,resolve:{company:_},canActivate:[v.a]}],O=function(){function e(){}return e.\u0275mod=r["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=r["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[i.e.forChild(b)],i.e]}),e}(),x=n("PCNd"),M=function(){function e(){}return e.\u0275mod=r["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=r["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[o.c,O,x.a]]}),e}()}}]);