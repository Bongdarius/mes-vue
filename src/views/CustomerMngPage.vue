<template>
  <div class="page">
    <Tabs value="0">
      <div class="flex">
        <TabList>
          <Tab value="CustomerMng">거래처관리 x</Tab>
          <Tab value="DeptMng">부서관리 x</Tab>
        </TabList>
        <div class="flex items-center w-full justify-end">
          <div class="flex gap-[10px] mr-[10px]">
            <Button label="<" severity="secondary" />
            <Button label=">" severity="secondary" />
            <Button label="새로고침" severity="secondary" rounded />
            <Button label="초기화" severity="secondary" rounded />
          </div>
        </div>
      </div>
      <TabPanels>
        <TabPanel value="CustomerMng">
          <div class="h-[60px] bg-[#48494d] flex items-center">
            <div class="flex gap-[10px] w-full justify-end">
              <Button label="신규" class="bar-button" />
              <Button label="저장" class="bar-button" />
              <Button label="삭제" class="bar-button" />
              <Button label="복사" class="bar-button" />
              <Button label="문자전송" class="bar-button" />
              <Button label="업로드" class="bar-button" />
              <Button label="다운로드" class="bar-button" />
            </div>
          </div>
          <div class="h-[60px] bg-gray-100 px-[40px] py-[12px] flex gap-2 items-center">
            <p class="required">법인구분</p>
            <Select
              class="query-cond-combo"
              :options="[
                { name: 'New York', code: 'NY' },
                { name: 'Rome', code: 'RM' },
                { name: 'London', code: 'LDN' },
                { name: 'Istanbul', code: 'IST' },
                { name: 'Paris', code: 'PRS' },
              ]"
              optionLabel="name"
              placeholder="Select"
            />
            <p>검색조건</p>
            <InputText class="query-cond-input w-[120px]"></InputText>
            <Button label="조회" class="bar-button" />
            <Button label="상세조회" severity="contrast" outlined />
          </div>
          <Splitter class="mb-8 h-[75vh]">
            <SplitterPanel class="flex">
              <wj-flex-grid
                :itemsSource="collectionView"
                :allowAddNew="true"
                :allowDelete="true"
                :initialized="gridInit"
                class="h-full"
              >
                <wj-flex-grid-cell-template cellType="TopLeft"> No </wj-flex-grid-cell-template>
                <wj-flex-grid-cell-template cellType="RowHeader" v-slot="cell">
                  {{ cell.row.index + 1 }}
                </wj-flex-grid-cell-template>
                <wj-flex-grid-column binding="companyName" header="거래처상호" width="*" />
                <wj-flex-grid-column binding="customerName" header="거래처명" width="*" />
                <wj-flex-grid-column binding="customerShortName" header="거래처약명" width="*" />
              </wj-flex-grid>
            </SplitterPanel>
            <SplitterPanel class="px-2.5 py-2.5">
              <div class="flex w-full h-auto">
                <table class="gaon-form">
                  <tbody>
                    <tr>
                      <td class="label required">거래처명</td>
                      <td><InputText /></td>
                      <td class="label">거래처약명</td>
                      <td><InputText /></td>
                      <td class="label required">거래처상태</td>
                      <td><InputText /></td>
                    </tr>
                    <tr>
                      <td class="label">거래처분류</td>
                      <td><InputText /></td>
                      <td class="label">거래처분류</td>
                      <td><InputText /></td>
                      <td class="label">거래처분류</td>
                      <td><InputText /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-[20px]">
                <Tabs value="0">
                  <TabList>
                    <Tab value="0">Header I</Tab>
                    <Tab value="1">Header II</Tab>
                    <Tab value="2">Header III</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel value="0">
                      <div class="m-0 border-[2px] border-solid border-[#48494d] p-[10px]">
                        <div class="flex w-full h-auto items-center">
                          <table class="gaon-form flex-grow">
                            <tbody>
                              <tr>
                                <td rowspan="7" class="min-w-[40px]">
                                  <div
                                    class="border-[1px] border-solid flex items-center justify-center px-2"
                                    style="writing-mode: vertical-lr"
                                  >
                                    세무정보
                                  </div>
                                </td>
                                <td class="label required">사업자번호</td>
                                <td>
                                  <InputMask id="basic" mask="99-999999" placeholder="99-999999" />
                                </td>
                                <td class="label required">회사구분</td>
                                <td>
                                  <Select
                                    class="form-combo"
                                    :options="[
                                      { name: 'New York', code: 'NY' },
                                      { name: 'Rome', code: 'RM' },
                                      { name: 'London', code: 'LDN' },
                                      { name: 'Istanbul', code: 'IST' },
                                      { name: 'Paris', code: 'PRS' },
                                    ]"
                                    optionLabel="name"
                                    placeholder="Select"
                                  />
                                </td>
                                <td rowspan="7" class="min-w-[40px]">
                                  <div
                                    class="border-[1px] border-solid flex items-center justify-center px-2"
                                    style="writing-mode: vertical-lr"
                                  >
                                    일반사항
                                  </div>
                                </td>
                                <td class="label required">휴대폰번호</td>
                                <td>
                                  <InputMask
                                    id="basic"
                                    mask="999-9999-9999"
                                    placeholder="010-1234-5678"
                                    class="w-[120px]"
                                  />
                                </td>
                                <td class="label required">E-Mail</td>
                                <td><InputText /></td>
                              </tr>
                              <tr>
                                <td class="label required">법인번호</td>
                                <td><InputText /></td>
                                <td class="label required">주민등록번호</td>
                                <td><InputText /></td>
                                <td class="label required">FAX 번호</td>
                                <td><InputText /></td>
                                <td class="label required">홈페이지</td>
                                <td><InputText /></td>
                              </tr>
                              <tr>
                                <td class="label required">대표자명</td>
                                <td><InputText /></td>
                                <td class="label required">전화번호</td>
                                <td><InputText /></td>
                                <td class="label">최초거래일</td>
                                <td><DatePicker /></td>
                                <td class="label">최종거래일</td>
                                <td><InputText /></td>
                              </tr>
                              <tr>
                                <td class="label required">종사업자번호</td>
                                <td><InputText /></td>
                                <td class="label required">업태</td>
                                <td><InputText /></td>
                                <td class="label">최초등록자</td>
                                <td><InputText /></td>
                                <td class="label">최종수정자</td>
                                <td><InputText /></td>
                              </tr>
                              <tr>
                                <td class="label required">종목</td>
                                <td><InputText /></td>
                                <td class="label required">관계사구분</td>
                                <td><InputText /></td>
                                <td class="label"></td>
                                <td><InputText /></td>
                                <td class="label"></td>
                                <td><InputText /></td>
                              </tr>
                              <tr>
                                <td class="label required">사업자주소</td>
                                <td colspan="4"><InputText /></td>
                                <td class="label"></td>
                                <td><InputText /></td>
                                <td class="label"></td>
                                <td><InputText /></td>
                              </tr>
                              <tr>
                                <td class="label required">전자금계산서발행</td>
                                <td><InputText /></td>
                                <td class="label required">세금계산서집계</td>
                                <td><InputText /></td>
                                <td class="label"></td>
                                <td><InputText /></td>
                                <td class="label"></td>
                                <td><InputText /></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="1">
                      <p class="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                        veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                        Consectetur, adipisci velit, sed quia non numquam eius modi.
                      </p>
                    </TabPanel>
                    <TabPanel value="2">
                      <p class="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                        praesentium voluptatum deleniti atque corrupti quos dolores et quas
                        molestias excepturi sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
                        fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero
                        tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                      </p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
              <div class="mt-[20px]">
                <Tabs value="0">
                  <TabList>
                    <Tab value="0">Header I</Tab>
                    <Tab value="1">Header II</Tab>
                    <Tab value="2">Header III</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel value="0">
                      <div class="m-0 border-[2px] border-solid border-[#48494d] p-[10px]">
                        <div class="flex w-full h-auto items-center">
                          <table class="gaon-form flex-grow">
                            <tbody>
                              <tr>
                                <td class="label w-[100px]">거래처종류</td>
                                <td>
                                  <div class="card flex flex-wrap justify-start gap-4 pl-[10px]">
                                    <div class="flex items-center gap-2">
                                      <Checkbox inputId="ingredient1" name="pizza" value="Cheese" />
                                      <label for="ingredient1"> 판매거래처 </label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                      <Checkbox
                                        inputId="ingredient2"
                                        name="pizza"
                                        value="Mushroom"
                                      />
                                      <label for="ingredient2"> 구매거래처 </label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                      <Checkbox inputId="ingredient3" name="pizza" value="Pepper" />
                                      <label for="ingredient3"> 개인거래처 </label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                      <Checkbox inputId="ingredient4" name="pizza" value="Onion" />
                                      <label for="ingredient4"> 수출거래처 </label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                      <Checkbox inputId="ingredient4" name="pizza" value="Onion" />
                                      <label for="ingredient4"> 기타거래처 </label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="1">
                      <p class="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                        veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                        Consectetur, adipisci velit, sed quia non numquam eius modi.
                      </p>
                    </TabPanel>
                    <TabPanel value="2">
                      <p class="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                        praesentium voluptatum deleniti atque corrupti quos dolores et quas
                        molestias excepturi sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
                        fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero
                        tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                      </p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
            </SplitterPanel>
          </Splitter>
        </TabPanel>
        <TabPanel value="DeptMng">
          <div style="height: 60px; background-color: #48494d"></div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import * as wijmoGrid from '@mescius/wijmo.grid';
import * as wijmoCore from '@mescius/wijmo';
import { onMounted } from 'vue';

interface Data {
  companyName: string;
  customerName: string;
  customerShortName: string;
}

let grid: wijmoGrid.FlexGrid | null = null;
let collectionView: wijmoCore.CollectionView | null = null;

const getDatas = (): Data[] => {
  const data: Data[] = [];
  for (let i = 0; i < 200; i++) {
    data.push({
      companyName: '거래처상호' + i,
      customerName: '거래처명' + i,
      customerShortName: '거래처약명' + i,
    });
  }
  return data;
};

onMounted(() => {
  collectionView = new wijmoCore.CollectionView(getDatas(), {
    trackChanges: true,
  });
});

const gridInit = (gridInstance: wijmoGrid.FlexGrid) => {
  grid = gridInstance;
};
</script>
<style>
@media (min-width: 1024px) {
  /* .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
  } */
}

.page .p-tab-active {
  background: #48494d;
  border-color: #48494d;
  color: white;
}

.page .p-tabpanels {
  padding: 0px;
}

.page .p-tablist-active-bar {
  background-color: #48494d;
}

.page .bar-button {
  background-color: #48494d;
  border: 0px !important;
}

.page .bar-button:hover {
  background-color: #3e3f42 !important;
}

.page .query-cond-combo {
  border-radius: 0;
  border: 0px;
  border-bottom: 1px solid black;
  background-color: transparent;
  box-shadow: none;
}

.page .query-cond-input {
  background: transparent;
  border-radius: 0;
  border: 0px;
  border-bottom: 1px solid;
}

.gaon-form {
  border-collapse: collapse;
  width: 100%; /* 테이블 너비를 전체 너비로 설정 */
}

.gaon-form td {
  border: 1px solid #ccc; /* 테두리 설정 */
  text-align: left;
}

.gaon-form .label {
  background-color: #f7f8fa;
  padding: 8px;
  font-weight: bold;
}

.required::before {
  content: '*';
  color: red; /* 빨간색 */
  margin-right: 4px; /* 글자와 간격 조정 */
}

.gaon-form .p-inputtext {
  width: 100%;
  max-width: 100px;
  height: 100%;
  border-radius: 0;
  border: 0px;
  background-color: transparent;
  box-shadow: none;
}

.page .p-splitter-gutter {
  background-color: #d9dce3;
  width: 8px;
}

.gaon-form .form-combo {
  border-radius: 0;
  border: 0px;
  background-color: transparent;
  box-shadow: none;
}
</style>
