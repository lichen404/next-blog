import React from "react";
import Link from "next/link";
import _ from 'lodash'

type Options = {
    totalCount: number,
    page: number,
    totalPage: number,
    pageSize: number,
    urlMaker?: (n: number) => string


}
const defaultUrlMaker = (n: number, pageSize: number) => `?page=${n}&page_size=${pageSize}`

export const usePager = (options: Options) => {
    const {page, totalPage, totalCount, urlMaker: _urlMaker, pageSize} = options
    const numbers = [1];
    const urlMaker = _urlMaker || defaultUrlMaker
    for (let i = page - 3; i <= page + 3; i++) {
        numbers.push(i)
    }
    numbers.push(totalPage)
    const pageNumbers = _.uniq(numbers).filter(n => n >= 1 && n <= totalPage).sort(((x, y) => {
        if (x > y) {
            return 1
        } else if (x < y) {
            return -1
        } else {
            return 0
        }
    })).reduce((result, n) => {
        return n - (result[result.length - 1] || 0) === 1 ? result.concat(n) : result.concat(-1, n)
    }, [])
    const pager = totalPage > 1 ? (
        <div className="wrapper">
            {page !== 1 && <Link href={urlMaker(page - 1, pageSize)}>
                <a>上一页</a>
            </Link>}
            {
                pageNumbers.map(n => n === -1 ? <span key={n}>...</span> :
                    <Link href={urlMaker(n, pageSize)} key={n}><a>{n}</a></Link>
                )
            }
            {page < totalPage && <Link href={urlMaker(page + 1, pageSize)}>
                <a>下一页</a>
            </Link>}
            共 {totalCount} 篇文章，当前是第 {page} / {totalPage} 页

            <style jsx>{`
              .wrapper > a, .wrapper > span {

                margin: 0 8px;

              }

              .wrapper {
                margin: 0 -8px;
                padding: 8px 0;
              }

            `
            }


            </style>
        </div>


    ) : null
    return {pager}
}
