export interface allUsersDetail{
    code:number,
    message:string,
    data : {
        took:number,
        timed_out:boolean,
        _shards:{
            total:number,
            successful:number,
            skipped:number,
            failed:number
        },
        hits:{
            total:{
                value:number,
                relation:string
            },
            max_score:number,
            hits:[
                {
                    _index:string,
                    _type:string,
                    _id:string,
                    _score:number,
                    _source:{
                        full_name:string,
                        email:string,
                        mobile_number:number,
                        address:{
                            country:string,
                            state:string,
                            district:string,
                            pin_code:number,
                            address_line:string
                        }
                    }
                }
            ]
        }
    }
}

export interface deleteUSer{
    code: number,
    message: string,
    data: {
        _index:string,
        _type:string,
        _id : string,
        _version:number,
        result:string,
        _shards:{
            total:number,
            successful:number,
            failed:number
        },
        _seq_no:number,
        _primary_term:number
    }
}

export interface updateUser{
    code: number,
    message: string,
    data: {
        _index:string,
        _type:string,
        _id : string,
        _version:number,
        result:string,
        _shards:{
            total:number,
            successful:number,
            failed:number
        },
        _seq_no:number,
        _primary_term:number
    }
}

export interface getOneById{
    code: number,
    message: string,
    data: {
        _index:string,
        _type:string,
        _id : string,
        _version:number,
        _seq_no:number,
        _primary_term:number,
        found:boolean,
        _source:{
            full_name: string,
            email: string,
            mobile_number:number,
            address:{
                country:string,
                state:string,
                district:string,
                pin_code:number,
                address_line:string
            }
        }
    }
}

export interface addUser{
    code: number;
    message: string;
    data: {
        _index:string,
        _type:string,
        _id : string,
        _version:number,
        result:string,
        _shards:{
            total:number,
            successful:number,
            failed:number
        },
        _seq_no:number,
        _primary_term:number
    }
}