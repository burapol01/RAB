import React, { useState, useEffect } from "react";
import FullWidthTextField from "../../../components/MUI/FullWidthTextField";
import AutocompleteComboBox from "../../../components/MUI/AutocompleteComboBox";
import FullWidthTextareaField from "../../../components/MUI/FullWidthTextareaField";
import debounce from 'lodash/debounce';
import { setValueMas } from "../../../../libs/setvaluecallback"
import TimeSheetBody from "./TimeSheetBody";

interface ServiceTimeSheetBodyProps {
  onDataChange?: (data: any) => void;
  defaultValues?: {
    requestNo: string;
    requestDate: string;
    requestId?: string;
    reqUser?: string;
    headUser?: string;
    costCenterId?: string;
    costCenterCode?: string;
    costCenterName?: string;
    status?: string;
    site?: string;
    countRevision?: string;
    serviceCenterId?: string;
    jobType?: string;
    budgetCode?: string;
    description?: string;
    fixedAssetId?: string;
    fixedAssetDescription?: string;
  };
  options?: {
    serviceCenter: any[];
    jobType: any[];
    budgetCode: any[];
    fixedAssetCode: any[];
    revision: any[];
    technician: any[];
    workHour: any[];
  };
  disableOnly?: boolean;
  actions?: string;

}

export default function ServiceTimeSheetBody({
  onDataChange,
  defaultValues,
  options,
  disableOnly,
  actions
}: ServiceTimeSheetBodyProps) {
  const [requestNo, setRequestNo] = useState(defaultValues?.requestNo || "");
  const [requestDate, setRequestDate] = useState(defaultValues?.requestDate || "");
  const [requestId, setRequestId] = useState(defaultValues?.requestId || "");
  const [reqUser, setEmployee] = useState(defaultValues?.reqUser || "");
  const [headUser, setheadUser] = useState(defaultValues?.headUser || "");
  const [costCenterId, setCostCenterId] = useState(defaultValues?.costCenterId || "");
  const [costCenterCode, setCostCenter] = useState(defaultValues?.costCenterCode || "");
  const [costCenterName, setCostCenterName] = useState(defaultValues?.costCenterName || "");
  const [status, setStatus] = useState(defaultValues?.status || "Draft");
  const [serviceCenterId, setServiceCenterId] = useState(defaultValues?.serviceCenterId || "");
  const [serviceCenter, setServiceCenter] = useState<any>(null);
  const [serviceName, setServiceName] = useState("");
  const [site, setSite] = useState(defaultValues?.site || "");
  const [jobType, setJobType] = useState<any>(null);
  const [budgetCode, setBudgetCode] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [fixedAssetCode, setFixedAssetCode] = useState<any>(null);
  const [fixedAssetDescription, setFixedAssetDescription] = useState("");
  const [countRevision, setCountRevision] = useState(defaultValues?.countRevision || "1");
  const [revisionCurrent, setRevision] = useState<any>(null);
  const [timeSheetData, settimeSheetData] = useState<any>(null); // State to store draft data  

  const handleDataChange = (data: any) => {
    settimeSheetData(data); // Store draft data
  };

  // Function to handle data change with debounce
  const debouncedOnDataChange = debounce((data: any) => {
    if (typeof onDataChange === 'function') {
      onDataChange(data);
    }
  }, 300); // Adjust debounce delay as needed

  // useEffect to send data change to parent component
  useEffect(() => {
    const data = {
      requestId,
      requestNo,
      requestDate,
      reqUser,
      headUser,
      costCenterId,
      costCenterCode,
      costCenterName,
      status,
      serviceCenterId,
      serviceCenter,
      serviceName,
      site,
      jobType,
      budgetCode,
      description,
      fixedAssetCode,
      fixedAssetDescription,
      countRevision,
      revisionCurrent,
      timeSheetData
    };
    // Call debounced function
    debouncedOnDataChange(data);
  }, [
    requestId, requestNo, requestDate, reqUser, headUser, costCenterId, costCenterCode, costCenterName,
    status, serviceCenterId, serviceCenter, serviceName, site, jobType, budgetCode, description,
    fixedAssetCode, fixedAssetDescription,
    countRevision, revisionCurrent, timeSheetData, onDataChange,
  ]);

  React.useEffect(() => {
    if (actions != "Create") {


      if (defaultValues?.serviceCenterId != "") {
        const mapCostCenterData = setValueMas(options?.serviceCenter, defaultValues?.serviceCenterId, 'serviceCenterId')
       // console.log(mapCostCenterData, 'mapCostCenterData')
        setServiceCenter(mapCostCenterData)
        setServiceName(mapCostCenterData?.serviceCenterName)
      }

      if (defaultValues?.budgetCode != "") {
        const mapBudgetData = setValueMas(options?.budgetCode, defaultValues?.budgetCode, 'budgetId')
        //console.log(mapBudgetData, 'mapBudgetData')
        setBudgetCode(mapBudgetData)

      }

      if (defaultValues?.jobType != "") {
        const mapJobTypeData = setValueMas(options?.jobType, defaultValues?.jobType, 'lov_code')
        //console.log(mapJobTypeData, 'mapJobTypeData')
        setJobType(mapJobTypeData)

      }

      if (defaultValues?.status != "") {
        setStatus(defaultValues?.status || "")
      }

      if (defaultValues?.countRevision != "") {
        setCountRevision(defaultValues?.countRevision || "")

      }
      if (defaultValues?.description != "") {
        setDescription(defaultValues?.description || "")

      }
      console.log(defaultValues?.fixedAssetId, 'mapfixedAssetData')
      if (defaultValues?.fixedAssetId != "") {
        const mapfixedAssetData = setValueMas(options?.fixedAssetCode, defaultValues?.fixedAssetId, 'assetCodeId')
        console.log(defaultValues?.fixedAssetId, 'mapfixedAssetData')
        setFixedAssetCode(mapfixedAssetData)
        setFixedAssetDescription(mapfixedAssetData.assetDescription)

      }

      if (defaultValues?.headUser != "") {
        //console.log(defaultValues?.headUser, 'headUser')
        setheadUser(defaultValues?.headUser || "");
      }

      console.log(defaultValues?.requestId, 'requestId')
      console.log(options?.revision, 'revision')
       if (defaultValues?.requestId != "") {
        
         const mapRevisionData = setValueMas(options?.revision, defaultValues?.requestId, 'reqId')
      console.log(mapRevisionData, 'mapRevisionData')
        setRevision(mapRevisionData)
        console.log(revisionCurrent,"revisionCurrent");

       }

    }


  }, [defaultValues])

  return (
    <div>
      <div className="row justify-start">
        <div className="col-md-3 mb-2">
          <FullWidthTextField
            labelName={"Request No."}
            value={requestNo}
            onChange={(value) => setRequestNo(value)}
            disabled={actions === "Create" || actions === "Update" ? true : disableOnly}
            hidden={actions === "Create" ? true : false}
          />
        </div>
        {actions !== "Create" && (
          <div className="col-md-3 mb-2">
            <FullWidthTextField
              labelName={"Date"}
              value={requestDate}
              onChange={(value) => setRequestDate(value)}
              disabled={actions === "Create" || actions === "Update" ? true : disableOnly}
              hidden={actions === "Create" ? true : false}
            />
          </div>
        )}
      </div>
      <div className="row justify-start">

        <div className="col-md-3 mb-2">
          <FullWidthTextField
            labelName={"Employee"}
            value={reqUser}
            onChange={(value) => setEmployee(value)}
            disabled={actions === "Create" || actions === "Update" ? true : disableOnly}
          />
        </div>
        <div className="col-md-3 mb-2">
          <FullWidthTextField
            labelName={"Cost center"}
            value={costCenterName + " [" + costCenterCode + "]"}
            onChange={(value) => setCostCenter(value)}
            disabled={actions === "Create" || actions === "Update" ? true : disableOnly}

          />
        </div>
        <div className="col-md-3 mb-2">
          <FullWidthTextField
            labelName={"Site"}
            value={site}
            disabled={actions === "Create" || actions === "Update" ? true : disableOnly}
            onChange={(value) => setSite(value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <FullWidthTextField
            labelName={"Status"}
            value={status}
            disabled={actions === "Create" || actions === "Update" ? true : disableOnly}
            onChange={(value) => setStatus(value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <FullWidthTextField
            labelName={"CountRevision"}
            value={countRevision}
            onChange={(value) => setCountRevision(value)}
            hidden={true}
            disabled={disableOnly}
          />
        </div>
      </div>
      <div className="row justify-start">
        <div className="col-md-3 mb-2">
          <AutocompleteComboBox
            // required={true}
            labelName={"Service Center"}
            column="serviceCentersCodeAndName"
            value={serviceCenter}
            disabled={disableOnly}
            setvalue={(data) => {
              setServiceCenter(data);
              setServiceName(data?.serviceCenterName || ""); // Clear serviceName if data is null
            }}
            options={options?.serviceCenter || []}
          />
        </div>
        <div className="col-md-3 mb-2">
          <FullWidthTextField
            labelName={"Service Name"}
            value={serviceName}
            disabled={actions === "Create" || actions === "Update" ? true : disableOnly}
            onChange={(value) => setServiceName(value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <AutocompleteComboBox
            // required={true}
            labelName={"Budget Code"}
            column="budgetCode"
            value={budgetCode}
            setvalue={setBudgetCode}
            disabled={disableOnly}
            options={options?.budgetCode || []}
          />
        </div>
        <div className="col-md-3 mb-2">
          <AutocompleteComboBox
            // required={true}
            labelName={"Jobtype"}
            column="lov_name"
            value={jobType}
            setvalue={setJobType}
            disabled={disableOnly}
            options={options?.jobType || []}
          />
        </div>
      </div>
      <div className="row justify-start">
        <div className="col-md-3 mb-2">
          <AutocompleteComboBox
            // required={true}
            labelName={"Fixed Asset Code"}
            column="assetCode"
            value={fixedAssetCode}
            disabled={disableOnly}
            setvalue={(data) => {
              // console.log(data,'data');              
              setFixedAssetCode(data);
              setFixedAssetDescription(data?.assetDescription || "");
            }}
            options={options?.fixedAssetCode || []}
          />
        </div>
        <div className="col-md-9 mb-2">
          <FullWidthTextareaField
            labelName={"Fixed Asset Description"}
            value={fixedAssetDescription}
            disabled={actions === "Create" || actions === "Update" ? true : disableOnly}
            multiline={false}
            onChange={(value) => setFixedAssetDescription(value)}
          />
        </div>
      </div>
      <div className="row justify-start">
        <div className="col-md-12 mb-2">
          <FullWidthTextareaField
            labelName={"Description"}
            value={description}
            disabled={disableOnly}
            multiline={true}
            onChange={(value) => setDescription(value)}
          />
        </div>
        {actions != "AcceptJob" && (
          <>
            <div className="col-md-3 mb-2">
              <AutocompleteComboBox
                labelName={"Revision"}
                column="revisionNo"
                value={revisionCurrent}
                setvalue={setRevision}
                disabled={actions === "Reade" ? false : disableOnly}
                options={options?.revision || []}
                orchange={(value) => setRevision(value)} // แก้ไขจาก orchange เป็น onChange
              />
            </div>

            <div className="col-md-12 mb-2">
              <TimeSheetBody
                onDataChange={handleDataChange}
                options={options}
                revisionCurrent={revisionCurrent}
                actions={actions}

              />
            </div>
          </>)}
      </div>
    </div>
  );
}
