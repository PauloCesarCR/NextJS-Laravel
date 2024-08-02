export function mcc(v: string){
    v = v.replace(/\D/g,""); 
    v = v.replace(/(\d{4})/g, "$1.");
    v = v.replace(/\.$/, ""); 
    v = v.substring(0, 19)//
  
    return v;
}
export function phoneMask(value: string) {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }