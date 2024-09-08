let SumMoneyTotal,SumProfit
function MoneyTotal(m){SumMoneyTotal=m;return m;}//实收金额
function Profit(m){SumProfit=m;return m;}//利润
function ProfitMargin(m)//利润率
{
	return ((SumProfit/SumMoneyTotal)*100).toFixed(2)+"%"
}