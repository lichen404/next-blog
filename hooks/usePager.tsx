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
    const {page, totalPage, urlMaker: _urlMaker, pageSize} = options
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

            {
                pageNumbers.map(n => n === -1 ? <span key={n}>...</span> :
                    <Link href={urlMaker(n, pageSize)} key={n}><a className="pageNumber">{n}</a></Link>
                )
            }


            <style jsx>{`
              .wrapper > a, .wrapper > span {

                margin: 0 8px;

              }

              .wrapper > .pageNumber ::after {
                position: absolute;
                content: "";
                width: 100%;
                height: 1px;
                background: #000;
                bottom: 0;
                left: 0;
                transition: .3s ease-in-out;
                visibility: hidden;
                transform: scaleX(0);
              }

              .wrapper > .pageNumber:hover::after {
                visibility: visible;
                transform: scaleX(1);
              }

              .wrapper > .pageNumber {
                position: relative;
                cursor: pointer;
                padding: 5px;
              }


              .wrapper {
                margin: 0 -8px;
                padding: 8px 0;
                white-space: nowrap;
              }

            `
            }


            </style>
        </div>


    ) : null
    return {pager}
}
