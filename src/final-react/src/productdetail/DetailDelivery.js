import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function DetailDelivery(props) {
  return (
    <div>
      <h3 style={{ padding: "20px" }}>구매 전 확인사항</h3>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>배송기간 안내</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            DG.com은 최대한 빠르게 모든 상품을 배송하기 위해 노력하고 있습니다.
            배송 시간은 판매자가 검수를 위하여 상품을 검수센터로 보내는 속도에
            따라 차이가 있습니다. [빠른배송 구매] - 판매자가 보관 신청한 상품 중
            검수에 합격한 상품을 DG.com의 전용 창고에 보관합니다. 보관 상품에
            한하여 바로 구매와 95점 구매가 가능합니다. - 오늘(오후 11:59까지)
            결제하면 내일 바로 출고되어 빠른 배송이 가능합니다. (연휴 및 공휴일,
            천재지변, 택배사 사유 등 예외적으로 출고일이 변경될 수 있습니다.
            빠른배송 안내 [일반 구매] - 거래가 체결된 시점부터
            48시간(일요일•공휴일 제외) 내에 판매자가 상품을 발송해야 하며,
            통상적으로 발송 후 1-2일 내에 DG.com 검수센터에 도착합니다. -
            검수센터에 도착한 상품은 입고 완료 후 3영업일 이내에 검수를
            진행합니다. 검수 합격시 배송을 준비합니다. * 상품 종류 및 상태에
            따라 검수 소요 시간은 상이할 수 있으며, 구매의사 확인에 해당할 경우
            구매자와 상담 진행으로 인해 지연이 발생할 수 있습니다. - 검수센터
            출고는 매 영업일에 진행하고 있으며, 출고 마감시간은 오후 5시입니다.
            출고 마감시간 이후 검수 완료건은 운송장번호는 입력되지만 다음
            영업일에 출고됩니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>검수 안내</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            판매자의 상품이 검수센터에 도착하면 전담 검수팀이 철저한 분석과
            검사로 정가품 확인을 진행합니다. - 검수센터에서는 정가품 여부를
            확인하기 위하여, 지속적으로 데이터를 쌓고 분석하여 기록하고
            있습니다. - 업계 전문가로 구성된 검수팀은 박스와 상품의 라벨에서
            바느질, 접착, 소재 등 모든 것을 검수합니다. 검수 결과는 불합격•검수
            보류•합격의 세가지 상태로 결과가 변경됩니다. 검수기준 보기 * 검수
            합격: KREAM 검수택(Tag)이 부착되어 배송을 준비함 * 검수 보류: 앱에서
            사진으로 상품의 상태 확인 및 구매 여부를 선택. (24시간 이후 자동
            검수 합격) * 검수 불합격: 즉시 거래가 취소되고 구매하신 금액을 환불
            처리함.(환불 수단은 결제 수단과 동일)
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>구매 환불/취소/교환 안내</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            KREAM은 익명 거래를 기반으로 판매자가 판매하는 상품을 구매자가
            실시간으로 구매하여 거래를 체결합니다. - 단순 변심이나 실수에 의한
            취소/교환/반품이 불가능합니다. 상품을 원하지 않으시는 경우 언제든지
            KREAM에서 재판매를 하실 수 있습니다. - 상품 수령 후, 이상이 있는
            경우 KREAM 고객센터로 문의해주시기 바랍니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <div
        className="point_guide sm"
        data-v-53b73c92
        data-v-9cce21b6
        style={{ padding: "20px" }}
      >
        <ul className="guide_list" data-v-53b73c92>
          <li className="guide_item" data-v-53b73c92>
            <div className="thumb_area" data-v-53b73c92>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA0MCAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjUgMjYuM0MxMS41MzUzIDI2LjMgNi43IDIxLjQ2NDcgNi43IDE1LjVDNi43IDkuNTM1MzMgMTEuNTM1MyA0LjcgMTcuNSA0LjdDMjMuNDY0NyA0LjcgMjguMyA5LjUzNTMzIDI4LjMgMTUuNUMyOC4zIDIxLjQ2NDcgMjMuNDY0NyAyNi4zIDE3LjUgMjYuM1oiIGZpbGw9IndoaXRlIiBzdHJva2U9IiMyMjIyMjIiIHN0cm9rZS13aWR0aD0iMS40IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yNSAyM0wzMSAyOSIgc3Ryb2tlPSIjMjIyMjIyIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8cGF0aCBkPSJNMTYgMTMuMzMzM0wyMC43NzI3IDE4TDMxIDgiIHN0cm9rZT0iIzIyMjIyMiIgc3Ryb2tlLXdpZHRoPSIyLjIiLz4KPC9zdmc+Cg=="
                alt=""
                className="img"
                data-v-53b73c92
              />
            </div>
            <div className="text_area" data-v-53b73c92>
              <strong className="title" data-v-53b73c92>
                100% 정품 보증
              </strong>
              <p className="desc" data-v-53b73c92>
                KREAM에서 검수한 상품이 정품이 아닐 경우, 구매가의 3배를
                보상합니다.
              </p>
            </div>
          </li>
          <li className="guide_item" data-v-53b73c92>
            <div className="thumb_area" data-v-53b73c92>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA0MCAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjUgMjYuM0MxMS41MzUzIDI2LjMgNi43IDIxLjQ2NDcgNi43IDE1LjVDNi43IDkuNTM1MzMgMTEuNTM1MyA0LjcgMTcuNSA0LjdDMjMuNDY0NyA0LjcgMjguMyA5LjUzNTMzIDI4LjMgMTUuNUMyOC4zIDIxLjQ2NDcgMjMuNDY0NyAyNi4zIDE3LjUgMjYuM1oiIGZpbGw9IndoaXRlIiBzdHJva2U9IiMyMjIyMjIiIHN0cm9rZS13aWR0aD0iMS40IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yNSAyM0wzMSAyOSIgc3Ryb2tlPSIjMjIyMjIyIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8cGF0aCBkPSJNMTYgMTMuMzMzM0wyMC43NzI3IDE4TDMxIDgiIHN0cm9rZT0iIzIyMjIyMiIgc3Ryb2tlLXdpZHRoPSIyLjIiLz4KPC9zdmc+Cg=="
                alt=""
                className="img"
                data-v-53b73c92
              />
            </div>
            <div className="text_area" data-v-53b73c92>
              <strong className="title" data-v-53b73c92>
                엄격한 다중 검수
              </strong>
              <p className="desc" data-v-53b73c92>
                모든 상품은 검수센터에 도착한 후, 상품별 전문가 그룹의 체계적인
                시스템을 거쳐 검수를 진행합니다.
              </p>
            </div>
          </li>
          <li className="guide_item" data-v-53b73c92>
            <div className="thumb_area" data-v-53b73c92>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA0MCAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjUgMjYuM0MxMS41MzUzIDI2LjMgNi43IDIxLjQ2NDcgNi43IDE1LjVDNi43IDkuNTM1MzMgMTEuNTM1MyA0LjcgMTcuNSA0LjdDMjMuNDY0NyA0LjcgMjguMyA5LjUzNTMzIDI4LjMgMTUuNUMyOC4zIDIxLjQ2NDcgMjMuNDY0NyAyNi4zIDE3LjUgMjYuM1oiIGZpbGw9IndoaXRlIiBzdHJva2U9IiMyMjIyMjIiIHN0cm9rZS13aWR0aD0iMS40IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yNSAyM0wzMSAyOSIgc3Ryb2tlPSIjMjIyMjIyIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8cGF0aCBkPSJNMTYgMTMuMzMzM0wyMC43NzI3IDE4TDMxIDgiIHN0cm9rZT0iIzIyMjIyMiIgc3Ryb2tlLXdpZHRoPSIyLjIiLz4KPC9zdmc+Cg=="
                alt=""
                className="img"
                data-v-53b73c92
              />
            </div>
            <div className="text_area" data-v-53b73c92>
              <strong className="title" data-v-53b73c92>
                정품 인증 패키지
              </strong>
              <p className="desc" data-v-53b73c92>
                검수에 합격한 경우에 한하여 KREAM의 정품 인증 패키지가 포함된
                상품이 배송됩니다.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DetailDelivery;
