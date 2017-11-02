
import { Model } from './Model';


export class Category extends Model{
    
    protected $dom: JQuery;
    private name: string;

	constructor(id: number, name: string) {
        super(id);
		this.name = name;
	}

	
	public getName(): string {
		return this.name;
	}

	public setName(value: string) {
		this.name = value;
	}

    public display($parent: JQuery): void {

        let div: string = "<div class='container "+this.name+"' id='"+ this.name+"' data-category="+ this.id +"><h3>"+ this.name+"</h3></div>";
       
        this.$dom = $(div);

        $parent.append( this.$dom);
    }
    
}