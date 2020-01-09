// import { Component, OnInit } from '@angular/core';
import { OnInit, AfterContentChecked, Injector, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, ChildActivationStart } from '@angular/router';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { BaseRecursoService } from '../../services/base-recurso.service';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap } from 'rxjs/operators';
import { State } from '@progress/kendo-data-query';
import { Colecao } from 'src/app/pages/basico/colecao/shared/colecao.model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { LoadingService } from '../../services/loading.service';

export abstract class BaseResourceGridComponent<T extends BaseResourceModel> implements OnInit, AfterViewChecked {

  public view?: Observable<GridDataResult>;
  public editedRowIndex: number;
  public helpList: any = [];
  public formGroup: FormGroup;
  public resources: T[] = [];
  protected route: ActivatedRoute;
  public columnsExcel: Array<{ colunm: string }> = [];
  protected router: Router;
  protected formBuilder: FormBuilder;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
    filter: {
      logic: 'and',
      filters: []
    }
  };
  public loadingService: LoadingService;
  private cdRef: ChangeDetectorRef;


  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseRecursoService<T>,
    protected createFormGroupFn: (dataItem?: any) => FormGroup,
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.loadingService = this.injector.get(LoadingService);
    this.cdRef = this.injector.get(ChangeDetectorRef); // para não dar problemas nos filhos
    this.formBuilder = this.injector.get(FormBuilder);
    this.formGroup = createFormGroupFn();
  }

  get loading() {
    return this.loadingService.isLoading();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges(); // para não dar erro ao carregar os filhos
  }

  ngOnInit() {
    this.resourceService.getHelp(localStorage.getItem('Seguimento'), this.router.url.replace('/', '')).
      subscribe(res => { this.helpList = res;
      });
    this.resourceService.read(this.gridState);
    this.view = this.resourceService;
    this.view.subscribe(res => {
      if (res) {
        if (res.data) {
          for (const key in res.data[0]) {
            if (key.indexOf('Id') === -1) {
              this.columnsExcel.push({ colunm: key });
            }
          }
        }
      }
    });
  }

  public addSpace(text: string) {
    return text.replace(/([A-Z])/g, ' $1');
  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.resourceService.read(this.gridState);
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);
    this.formGroup = this.createFormGroupFn();
    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.editedRowIndex = rowIndex;
    this.formGroup = this.createFormGroupFn(dataItem);
    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = formGroup.value;
    this.resourceService.save(this.resource, isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resourceService.remove(dataItem);
  }

  public closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
  public getHelp(helpIdentificador: string, helpTipo: string) {

    if (this.helpList.length === 0) {
      return { helpTexto: 'Sem mensagem' };
    } else {
      return this.helpList.find(item => {
        // console.log(item.helpIdentificador+"   "+helpTipo)
        return item.helpIdentificador === helpIdentificador && item.helpTipo === helpTipo;
      });
    }
  }
}

