class MemoryContainer {
    constructor(){
        this.elements = [];
    }

    getAll = () => {
        return [...this.elements];
    }

    save = (newElement) =>{
        this.elements.push(newElement);
        return newElement;
    }
}

export default MemoryContainer;
