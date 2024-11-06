// 비어있나요?
// 20225225 나성민


/////////////////////////////////////////////////////////////
function isEmpty(value) {
    if(value === null){
        return true;                                    // null 처리 
    }
    if(typeof value == "object"){                       // object 처리
        var type = Object.prototype.toString.call(value).slice(8, -1);  //Object의 타입 확인
        if(type == "Object"){                           // Object - 재귀
            var check = true;
            for(var key in value){
                var isn = isEmpty(value[key]);
                check = check && isn;
            }
            return check;
        }
        else if (type == "Array"){                      // Array - 재귀
            var check = true;
            for (var i = 0; i < value.length; i++){
                var isn = isEmpty(value[i]);
                check = check && isn;
            }
            return check;
        }
    }
    if(value === undefined){
        return true;
    }
    if(value === "" || value === ''){
        return true;
    }
    if(value === 0 || value === false || Number.isNaN(value)){
        return false;
    }
    if(value){
        return false;                                   // Number
    }
    else{
        return true;                                   // Number
    }
}
/////////////////////////////////////////////////////////////





// 테스트 
/////////////////////////////////////////////////////////////

var res = isEmpty(null); // 출력: true
console.log(res);
var res = isEmpty({}); // 출력: true
console.log(res);
var res = isEmpty(0); // 출력: false
console.log(res);
var res = isEmpty(false); // 출력: false
console.log(res);
var res = isEmpty([{}, {a:[]}]); // 출력: true
console.log(res);
var res = isEmpty({a: null, b: ''}); // 출력: true
console.log(res);

// 추가 테스트
/////////////////////////////////////////////////////////////

console.log('====');
var res = isEmpty(undefined); // 출력: true
console.log(res);
var res = isEmpty(NaN); // 출력: false
console.log(res);
var res = isEmpty(""); // 출력: true
console.log(res);
var res = isEmpty([{}, {a:[]}, {b:[]}, undefined]); // 출력: true
console.log(res);
var res = isEmpty({a: null, b: '', c: undefined}); // 출력: true
console.log(res);
var res = isEmpty([{}, {a:[]}, {b:[]}, NaN]); // 출력: false
console.log(res);
var res = isEmpty({a: null, b: '', c: 12}); // 출력: false
console.log(res);  
var res = isEmpty(1); // 출력: false
console.log(res);
var res = isEmpty([1, 2, 3]); // 출력: false
console.log(res);
var res = isEmpty(Symbol()); // 출력: false
console.log(res);
