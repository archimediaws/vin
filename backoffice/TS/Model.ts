export abstract class Model {

	protected id: number;
	


	constructor($id: number) {
		this.id = $id;
	}
    

	public getId(): number {
		return this.id;
	}

	public setId(value: number) {
		this.id = value;
	}
	
	public get$dom(): JQuery {
		return this.$dom;
	}
    //! important car tous les elments qui ont  sont dynamique 
    protected abstract $dom: JQuery;
    abstract display( $parent: JQuery): void;

}