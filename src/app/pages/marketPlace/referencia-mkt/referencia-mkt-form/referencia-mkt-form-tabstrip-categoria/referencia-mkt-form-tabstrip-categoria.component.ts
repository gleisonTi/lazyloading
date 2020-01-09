import { CategoriaService } from './../../../categoria/shared/categoria.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Component, ElementRef, OnInit, Input, Injector, Renderer2, ViewChild } from '@angular/core';
import { ReferenciaMktCategoria } from '../../shared/referencia-categoria-mkt.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Categoria } from '../../../categoria/shared/categoria.model';
import { CategoriaMktService } from './shared/referencia-categoria-mkt.service';
import { ArvoreSubCategorias } from '../../../categoria/shared/arvoresubcategorias.model';

const createFormGroupCategoriaMkt = (dataItem?: ReferenciaMktCategoria) => {
    if(dataItem){
      return new FormGroup({
        ReferenciaMktCategoriaId: new FormControl(dataItem.ReferenciaMktCategoriaId),
        ReferenciaMktId: new FormControl(dataItem.ReferenciaMktId),
        CategoriaId: new FormControl(dataItem.CategoriaId)
      })
    }else{
      return new FormGroup({
        ReferenciaMktCategoriaId: new FormControl('00000000-0000-0000-0000-000000000000'),
        ReferenciaMktId: new FormControl('00000000-0000-0000-0000-000000000000'),
        CategoriaId: new FormControl('00000000-0000-0000-0000-000000000000')
      });
    }
};

@Component({
    selector: 'incca-referencia-mkt-form-tabstrip-categoria',
    templateUrl: './referencia-mkt-form-tabstrip-categoria.html',
    styleUrls: ['./referencia-mkt-form-tabstrip-categoria.scss']
})
  
export class ReferenciaMktFormTabstripCategoria extends BaseResourceGridComponent<ReferenciaMktCategoria> implements OnInit {

    public arvoreSubcategorias: ArvoreSubCategorias[] = []
    formGroup: FormGroup
    //Categorias sem categoriasPai
    public categoriaMktList: Categoria[] = []
    public todasCategoriasList: Categoria[] = []
    public dataReferenciaMktCategoria: ReferenciaMktCategoria[] = []
    @Input()ReferenciaMktId: string;

    constructor(protected injector: Injector,
        public categoriaMktService: CategoriaMktService,
        public categoriaService: CategoriaService,
        ){
            super(injector, new ReferenciaMktCategoria(), categoriaMktService, createFormGroupCategoriaMkt);
        }

    ngOnInit(){
        super.ngOnInit()
        this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'ReferenciaMktCategoria').subscribe(res => this.helpList = res);
        //Busca os dados da dropdown "Categoria", retorna lista de categorias que não possuem CategoriaPaiId
        this.categoriaMktService.getAllCategoriasPai('MERCADOLIVRE', ).subscribe(res => {this.categoriaMktList = res.data; console.log(this.categoriaMktList)});
        //Todas as categorias, utilizado na função getname.
        this.categoriaService.getAll().subscribe(res => {this.todasCategoriasList = res.data})
    }

    //Ao selecionar um elemento do dropdown adiciona no array arvoreSubcategorias o elemento que foi selecionado.
    //Foi criado para mostrar no template acima do botão "Novo" a sequência de categorias selecionadas pelo usuário.
    alteraArvore(e: ArvoreSubCategorias){

        if(e.CategoriaId !== null)
            this.arvoreSubcategorias.push({CategoriaId: e.CategoriaId, CategoriaNome: e.CategoriaNome});

        //Ao clicar em um elemento do dropdown, altera o nome do span do kendo para o elemento selecionado
        document.getElementById("dropCategorias").children[0].children[0].textContent = e.CategoriaNome
        //Busca as categorias filhas do elemento selecionado no dropdown.
        this.categoriaService.getAll(null,null,undefined,e.CategoriaId).subscribe((res => {this.categoriaMktList = res.data}))
    }

    //Ao clicar no ícone "-", remove do array o último elemento criado
    removeElementoArvore(){
        this.arvoreSubcategorias.pop()
        if(this.arvoreSubcategorias.length !== 0){
            let ultimoElementoId = this.arvoreSubcategorias[this.arvoreSubcategorias.length - 1].CategoriaId
            let ultimoElementoNome = this.arvoreSubcategorias[this.arvoreSubcategorias.length - 1].CategoriaNome
            this.formGroup.get('CategoriaId').setValue(this.arvoreSubcategorias[this.arvoreSubcategorias.length - 1].CategoriaId)
            this.categoriaService.getAll(null,null,undefined, ultimoElementoId).subscribe((res => {this.categoriaMktList = res.data}))
            //Altera o nome do span do kendo para o nome do elemento anterior ao excluido no dropdown.
            document.getElementById("dropCategorias").children[0].children[0].textContent = ultimoElementoNome
        }else{
            this.formGroup.get('CategoriaId').setValue(null)
            //Ao apagar o último elemento da árvore, altera o nome do span do kendo para o nome padrão do dropdown "Categorias..."
            document.getElementById("dropCategorias").children[0].children[0].textContent = 'Categorias...'
            //Busca as categorias que não possuem categorias pai
            this.categoriaMktService.getAllCategoriasPai('MERCADOLIVRE', ).subscribe(res => {this.categoriaMktList = res.data});
        }
    }

    public addHandler({ sender }) {
        this.closeEditor(sender);
        this.formGroup = this.createFormGroupFn()
        sender.addRow(this.formGroup);

        this.arvoreSubcategorias = []
        this.categoriaMktService.getAllCategoriasPai('MERCADOLIVRE', ).subscribe(res => {this.categoriaMktList = res.data});
    }

    public cancelHandler({ sender, rowIndex }) {
        this.closeEditor(sender, rowIndex);
        this.arvoreSubcategorias = []
        this.categoriaMktService.getAllCategoriasPai('MERCADOLIVRE', ).subscribe(res => {this.categoriaMktList = res.data});
    }

    public saveHandler({ sender, rowIndex, formGroup, isNew }){
       formGroup.get('ReferenciaMktId').setValue(this.ReferenciaMktId);
        this.resource = ReferenciaMktCategoria.fromJson(formGroup.value);

        this.categoriaMktService.save(this.resource, isNew)
        sender.closeRow(rowIndex);
        this.arvoreSubcategorias = []
    }

    public removeHandler({ dataItem }){
        this.resource = ReferenciaMktCategoria.fromJson(dataItem)
        this.categoriaMktService.remove(this.resource)
    }

    public handleCategoriaFilter(value: string){
        this.todasCategoriasList = this.todasCategoriasList.filter((item) => item.CategoriaNome.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    }

    public editHandler({ sender, rowIndex, dataItem }) {
        this.closeEditor(sender);
        this.editedRowIndex = rowIndex;
    
        this.formGroup = this.createFormGroupFn(dataItem)
        sender.editRow(rowIndex, this.formGroup);

        //Limpa a arvore caso possua elementos de outra categoria
        this.arvoreSubcategorias = [];

        //Corta em arrays os pedaços da arvore usando como separador o ' > '
        let pedacosArvore = dataItem.CategoriaSubCategoriaNome.split(' > ')

        //Coloca os pedaços da arvore no array de arvores para mostrar no template
        for(let i=0;i<pedacosArvore.length;i++){
            this.arvoreSubcategorias.push({CategoriaId: null, CategoriaNome: pedacosArvore[i]});
        }

        //Copula o objeto de arvore com os ids da categoria.
        for(let i=0;i<this.arvoreSubcategorias.length;i++){
            for(let j=0;j<this.todasCategoriasList.length;j++){
                if(this.arvoreSubcategorias[i].CategoriaNome == this.todasCategoriasList[j].CategoriaNome){
                    this.arvoreSubcategorias[i].CategoriaId = this.todasCategoriasList[j].CategoriaId
                }
            }
        }

        let ultimoElementoId = this.arvoreSubcategorias[this.arvoreSubcategorias.length - 1].CategoriaId
        this.categoriaService.getAll(null,null,undefined,ultimoElementoId).subscribe((res => {this.categoriaMktList = res.data}))

    }

    public getName(dataItem: ReferenciaMktCategoria): string {

        return this.todasCategoriasList.length !== 0 ? this.todasCategoriasList.find(item =>
          item.CategoriaId === dataItem.CategoriaId).CategoriaNome : 'carregando...';
    }
    
}