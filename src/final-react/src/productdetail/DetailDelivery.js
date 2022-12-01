import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
            검수 기준
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            DG.com의 검수기준은 거래 당사자간 원활한 거래와 보다 균형있는
            검수기준 확립을 위해 지속적으로 업데이트 되고 있습니다. 거래에 앞서
            최신 검수기준을 참고하시기 바랍니다. 회원님께서 판매 또는 구매하신
            모든 상품은 DG.com의 전문 검수팀이 제품의 컨디션을 꼼꼼하게 확인한
            후, 검수 합격 시에만 출고하고 있습니다.
            <br />
            <br />
            DG.com의 검수기준으로 고지된 사항 이외 아래와 같이 제조사에서
            불량으로 인정하지 않는 기준, 또는 당사 검수기준에 따라 그 여부를
            명확히 분별할 수 없는 상품의 경우 하자로 판단하지 않으며,이로 인한
            구매 취소는 불가하므로 신중한 거래 부탁드립니다.
            <br />
            <br />
            - 상품택, 구성품 등의 고리 누락/이탈
            <br />
            - 제조공정, 유통과정 또는 소재 특성 상 발생할 수 있는 사항
            <br />
            <br />
            고지드린 검수 기준으로 판정하기 모호한 상품 상태, 비특정적 상품
            상태, 특정 모델의 제조공정에 따른 개체차이와 관련하여서는 검수센터
            책임자의 최종 판단 하에 결정하게 됩니다.
            <br />
            <br />
            DG.com의 검수기준에 동의하지 않으실 경우 거래가 불가하오니 거래
            당사자는 거래에 앞서 DG.com의 검수기준을 반드시 검토하시기 바랍니다.
            <br />
            <br />
            <br />
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>
              불합격/페널티 부과사항
            </span>
            <br />
            <br />
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">구분</TableCell>
                    <TableCell align="center">불합격</TableCell>
                    <TableCell align="center">구매자 의사 확인</TableCell>
                    <TableCell align="center">합격</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      모조품/가품 상품 구성품 등{" "}
                    </TableCell>
                    <TableCell align="center">
                      O <br />
                      페널티 15% 이용정지{" "}
                    </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">손상/오염/사용감 </TableCell>
                    <TableCell align="center">
                      O <br />
                      페널티 15% 이용정지{" "}
                    </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">상품 불일치 </TableCell>
                    <TableCell align="center">
                      O <br />
                      페널티 10%
                    </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      사이즈 불일치 라벨 기재 사이즈 기준{" "}
                    </TableCell>
                    <TableCell align="center">
                      O <br />
                      페널티 10%
                    </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      기본 구성품 누락 와펜, 스트링, 벨크로 패치 등{" "}
                    </TableCell>
                    <TableCell align="center">
                      O <br />
                      페널티 10%
                    </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            ※손상/오염/사용감 판정의 경우 사용으로 인한 오염, 보풀, 세탁흔적
            등의 기준을 종합하여 검수원과 검수센터 책임자의 최종 판단하에
            결정하게 됩니다.
            <br />
            <br />
            <br />
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>
              패키지 및 구성품
            </span>
            <br />
            <br />
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">구분</TableCell>
                    <TableCell align="center">불합격</TableCell>
                    <TableCell align="center">구매자 의사 확인</TableCell>
                    <TableCell align="center">합격</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      패키지 손상/누락
                      <br />
                      폴리백, 속지, 상품정보 라벨지 등{" "}
                    </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">O</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">상품 정보 택 누락 </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">
                      상품 정보택 필수 제품군
                    </TableCell>
                    <TableCell align="center">
                      상품 정보택 필수 제품군 외
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      상품 정보 택 손상/필수정보 유실
                      <br />
                      UPC, 품번, 사이즈 등{" "}
                    </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">
                      필수정보 불일치 또는 확인 불가
                    </TableCell>
                    <TableCell align="center">
                      필수정보 일치 및 확인 가능
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      추가 구성품 누락
                      <br />
                      스페어 단추, 설명서 등{" "}
                    </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">O</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <br />※ 기타 구성품(기본/추가 구성품 외 인보이스, 영수증, 습지 등)
            및 타 업체 검수택의 경우 포함되는 것을 보장하지 않으며 검수 중
            제거될 수 있습니다.
            <br />※ 브랜드에서 제공하는 스티커 사은품 등은 검수 기준에 포함되지
            않습니다.
            <br />※ 유통사 및 유통경로에 따라 상품택의 유무와 구성이 상이할 수
            있습니다.
            <br />
            <br />
            <br />
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>
              제품 상태
            </span>
            <br />
            <br />
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">구분</TableCell>
                    <TableCell align="center">불합격</TableCell>
                    <TableCell align="center">구매자 의사 확인</TableCell>
                    <TableCell align="center">합격</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      상품 정보 불일치 <br />
                      시즌, 컬러, 품번 등
                    </TableCell>
                    <TableCell align="center">O</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      내부라벨 필수정보 확인 불가{" "}
                    </TableCell>
                    <TableCell align="center">O</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">프린팅 불량</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">
                      필수정보 불일치 또는 확인 불가
                    </TableCell>
                    <TableCell align="center">
                      필수정보 일치 및 확인 가능
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">프린팅 불량</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">≥5mm</TableCell>
                    <TableCell align="center">&lt;5mm</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">자수 손상</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">O</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">변색</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">O</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">오염</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">≥5mm</TableCell>
                    <TableCell align="center">&lt;5mm</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">소재 손상/유실 </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">O</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">조립 불량</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">O</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">봉제 불량</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">O</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      부자재 기능상실
                      <br />
                      지퍼, 스토퍼, 벨크로, 밴드 등
                    </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">O</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <br />
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>
              유의사항
            </span>
            <br />
            <br />※ '구매자 의사 확인'의 상품은 최초 보류 알림 기준 24시간 이내
            회신이 없을 경우에 자동 검수 합격 처리되며 이와 관련한 취소는
            불가능합니다.
            <br />※ 모조품/가품 판매 및 페널티 회피 시 해당 계정은 회원 자격이
            정지되며, 새로운 아이디로 가입을 하여도 이전 거래 기록을 근거로
            서비스 이용을 제재할 수 있습니다.
            <br />※ 국내 발매 제품/해외 발매 제품의 여부는 검수 불합격 사항이
            아니며, 이로 인한 구매 취소 또한 불가합니다.
            <br />※ DG.com을 통해 거래된 모든 상품은 입고 시 자동화 처리를 위해
            고유의 정보를 포함한 스티커가 부착됩니다. 부착 위치는 제품에 따라
            차이가 있으며 이는 발송(반송) 시에도 제거되지 않습니다.
            <br />
            <br />
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>
              검수 불합격 시 반송 택배 운임
            </span>
            <br />
            [착불]
            <br />
            검수 기준상 '불합격' 에 해당하는 반송건
            <br />
            <br />
            [선불]
            <br />
            '구매의사 확인' 이후 발생하는 반송건
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
            배송기간 안내
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <span style={{ fontWeight: "bold" }}>
              DG.com은 최대한 빠르게 모든 상품을 배송하기 위해 노력하고
              있습니다. 배송 시간은 판매자가 검수를 위하여 상품을 검수센터로
              보내는 속도에 따라 차이가 있습니다.
            </span>{" "}
            <br />
            <br />
            <span style={{ fontWeight: "bold" }}>[빠른배송 구매]</span>
            <br /> - 판매자가 보관 신청한 상품 중 검수에 합격한 상품을 DG.com의
            전용 창고에 보관합니다. 보관 상품에 한하여 바로 구매와 95점 구매가
            가능합니다.
            <br />
            <br /> - 오늘(오후 11:59까지) 결제하면 내일 바로 출고되어 빠른
            배송이 가능합니다. (연휴 및 공휴일, 천재지변, 택배사 사유 등
            예외적으로 출고일이 변경될 수 있습니다. <br />
            <br />
            <span style={{ fontWeight: "bold" }}>[일반 구매]</span>
            <br /> - 거래가 체결된 시점부터 48시간(일요일•공휴일 제외) 내에
            판매자가 상품을 발송해야 하며, 통상적으로 발송 후 1-2일 내에 DG.com
            검수센터에 도착합니다.
            <br />
            <br /> - 검수센터에 도착한 상품은 입고 완료 후 3영업일 이내에 검수를
            진행합니다. 검수 합격시 배송을 준비합니다. <br />* 상품 종류 및
            상태에 따라 검수 소요 시간은 상이할 수 있으며, 구매의사 확인에
            해당할 경우 구매자와 상담 진행으로 인해 지연이 발생할 수 있습니다.
            <br />
            <br /> - 검수센터 출고는 매 영업일에 진행하고 있으며, 출고
            마감시간은 오후 5시입니다. 출고 마감시간 이후 검수 완료건은
            운송장번호는 입력되지만 다음 영업일에 출고됩니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
            검수 안내
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <span style={{ fontWeight: "bold" }}>
              판매자의 상품이 검수센터에 도착하면 전담 검수팀이 철저한 분석과
              검사로 정가품 확인을 진행합니다.
            </span>
            <br />
            <br /> - 검수센터에서는 정가품 여부를 확인하기 위하여, 지속적으로
            데이터를 쌓고 분석하여 기록하고 있습니다. <br />
            <br />- 업계 전문가로 구성된 검수팀은 박스와 상품의 라벨에서 바느질,
            접착, 소재 등 모든 것을 검수합니다. <br />
            <br />
            <span style={{ fontWeight: "bold" }}>
              {" "}
              검수 결과는 불합격•검수 보류•합격의 세가지 상태로 결과가
              변경됩니다.
            </span>
            <br /> <br />* 검수 합격: DG.com 검수택(Tag)이 부착되어 배송을
            준비함 <br />* 검수 보류: 앱에서 사진으로 상품의 상태 확인 및 구매
            여부를 선택. (24시간 이후 자동 검수 합격)
            <br /> * 검수 불합격: 즉시 거래가 취소되고 구매하신 금액을 환불
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
          <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
            구매 환불/취소/교환 안내
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <span style={{ fontWeight: "bold" }}>
              DG.com은 판매자가 판매하는 상품을 구매자가 실시간으로 구매하여
              거래를 체결합니다.
            </span>
            <br />
            <br />
            - 단순 변심이나 실수에 의한 취소/교환/반품이 불가능합니다.
            <br />
            <br />- 상품 수령 후, 이상이 있는 경우 DG.com 고객센터로
            문의해주시기 바랍니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Card>
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
                  style={{ float: "left", height: "50px" }}
                />
              </div>
              <div className="text_area" data-v-53b73c92>
                <strong className="title" data-v-53b73c92>
                  100% 정품 보증
                </strong>
                <p className="desc" data-v-53b73c92>
                  DG.com에서 검수한 상품이 정품이 아닐 경우, 구매가의 3배를
                  보상합니다.
                </p>
              </div>
            </li>
            <br />
            <li className="guide_item" data-v-53b73c92>
              <div className="thumb_area" data-v-53b73c92>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA0MCAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjUgMjYuM0MxMS41MzUzIDI2LjMgNi43IDIxLjQ2NDcgNi43IDE1LjVDNi43IDkuNTM1MzMgMTEuNTM1MyA0LjcgMTcuNSA0LjdDMjMuNDY0NyA0LjcgMjguMyA5LjUzNTMzIDI4LjMgMTUuNUMyOC4zIDIxLjQ2NDcgMjMuNDY0NyAyNi4zIDE3LjUgMjYuM1oiIGZpbGw9IndoaXRlIiBzdHJva2U9IiMyMjIyMjIiIHN0cm9rZS13aWR0aD0iMS40IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yNSAyM0wzMSAyOSIgc3Ryb2tlPSIjMjIyMjIyIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8cGF0aCBkPSJNMTYgMTMuMzMzM0wyMC43NzI3IDE4TDMxIDgiIHN0cm9rZT0iIzIyMjIyMiIgc3Ryb2tlLXdpZHRoPSIyLjIiLz4KPC9zdmc+Cg=="
                  alt=""
                  className="img"
                  data-v-53b73c92
                  style={{ float: "left", height: "50px" }}
                />
              </div>
              <div className="text_area" data-v-53b73c92>
                <strong className="title" data-v-53b73c92>
                  엄격한 다중 검수
                </strong>
                <p className="desc" data-v-53b73c92>
                  모든 상품은 검수센터에 도착한 후, 상품별 전문가 그룹의
                  체계적인 시스템을 거쳐 검수를 진행합니다.
                </p>
              </div>
            </li>
            <br />
            <li className="guide_item" data-v-53b73c92>
              <div className="thumb_area" data-v-53b73c92>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA0MCAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjUgMjYuM0MxMS41MzUzIDI2LjMgNi43IDIxLjQ2NDcgNi43IDE1LjVDNi43IDkuNTM1MzMgMTEuNTM1MyA0LjcgMTcuNSA0LjdDMjMuNDY0NyA0LjcgMjguMyA5LjUzNTMzIDI4LjMgMTUuNUMyOC4zIDIxLjQ2NDcgMjMuNDY0NyAyNi4zIDE3LjUgMjYuM1oiIGZpbGw9IndoaXRlIiBzdHJva2U9IiMyMjIyMjIiIHN0cm9rZS13aWR0aD0iMS40IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yNSAyM0wzMSAyOSIgc3Ryb2tlPSIjMjIyMjIyIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8cGF0aCBkPSJNMTYgMTMuMzMzM0wyMC43NzI3IDE4TDMxIDgiIHN0cm9rZT0iIzIyMjIyMiIgc3Ryb2tlLXdpZHRoPSIyLjIiLz4KPC9zdmc+Cg=="
                  alt=""
                  className="img"
                  data-v-53b73c92
                  style={{ float: "left", height: "50px" }}
                />
              </div>
              <div className="text_area" data-v-53b73c92>
                <strong className="title" data-v-53b73c92>
                  정품 인증 패키지
                </strong>
                <p className="desc" data-v-53b73c92>
                  검수에 합격한 경우에 한하여 DG.com의 정품 인증 패키지가 포함된
                  상품이 배송됩니다.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default DetailDelivery;
