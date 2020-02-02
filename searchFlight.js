function selectFlying(){
    var dep = document.getElementById('departing');
    var ret = document.getElementById('returning');
    var origin = document.getElementById('flyFrom');
    var destination = document.getElementById('flyTo');
    for(i = 0 ; i < dep.options.length ; i++){
        if(origin.click){
            if(dep.options[i].value.toUpperCase().includes(origin.value.toUpperCase()) || 
                dep.options[i].id.includes(origin.value.toUpperCase())){
                dep.selectedIndex = i;
                    break;
            }
        }
    }
    for(i = 0 ; i < ret.options.length ; i++){
        if(destination.click){
            if(ret.options[i].value.toUpperCase().includes(destination.value.toUpperCase()) || 
                ret.options[i].id.includes(destination.value.toUpperCase())){
                    ret.selectedIndex = i;
                    break;
            }
        }
    }
}
