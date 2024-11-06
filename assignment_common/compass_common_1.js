// SNS 친구 추천 시스템
// 20225225 나성민


/////////////////////////////////////////////////////////////
function friendRecommendations(network, user) {
    const friends = network[user];
    const len = friends.length;
    const set = new Set();              // set을 활용한 중복 제거
    for(var i = 0; i < len; i++){
        var friendfriend = network[friends[i]];
        var friendfriend_len = friendfriend.length;
        for(var j = 0; j < friendfriend_len; j++){
            set.add(friendfriend[j]);   // 친구의 친구 추가
        }
    }
    for(var i = 0; i < len; i++){
        set.delete(friends[i]);         // 직접 친구 제거
    }
    set.delete(user);                   // 본인 제거
    const res = Array.from(set);
    return res;
}
/////////////////////////////////////////////////////////////





// 테스트
/////////////////////////////////////////////////////////////
const network = {
    Alice: ["Bob", "Charlie"],
    Bob: ["Alice", "David"],
    Charlie: ["Alice", "Eve"],
    David: ["Bob"],
    Eve: ["Charlie"]
};
const user = "Alice";

const res = friendRecommendations(network, user);

console.log(res);