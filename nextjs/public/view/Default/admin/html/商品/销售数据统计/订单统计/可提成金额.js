function productwhere(){
 let str=' where @.from=\'dhgate\' and year(:CommissionTime)=<.arr(4)/> and  month(:CommissionTime)={r:arr(5)/> and not(@.CommissionTime is null) \
 <if "Fun(arr(7))"!=""}\
 and @.fromhead=\'<.unarr(7)/>\'\
 </if>\
 order by @.CommissionTime desc,@.id desc'
 return str
}
function fromhead(name)
{
 return escape(name).replace(/\%/ig,"_");
}