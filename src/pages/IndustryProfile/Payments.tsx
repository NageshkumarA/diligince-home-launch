import React from "react";
import { useState, useEffect } from "react";

import {
  Building,
  FileText,
  Users,
  CreditCard,
  Bell,
  Lock,
  Edit,
  Upload,
  Plus,
  Trash,
  Mail,
  Phone,
  Globe,
  Calendar,
  Save,
  X,
  Home,
  User,
  Info
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Payment = () => {
  const [accountholdername, setAccountholdername] = useState("");
  const [accountnumber, setAccountnumber] = useState(null);
  const [bankname, setBankname] = useState("");
  const [ifsccode, setIfsccode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("bank"); // default value
  const [invoicePreferences, setInvoicePreferences] = useState({
    receiveByEmail: true,
    monthlyConsolidated: true,
    includePONumber: true,
  });
  const [paymentEdit, setPaymentEdit] = useState(false);
  const [originalpaydata, setOriginalpayData] = useState<payData | null>(null);
  const [accountInputStage, setAccountInputStage] = useState('initial');
  const [firstAccountNumber, setFirstAccountNumber] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  type payData = {
    accountholdername: string;
    accountnumber: number;
    bankname: string;
    ifsccode: string;
    selectedPayment: string;
    invoicePreferences: {
      receiveByEmail: boolean;
      monthlyConsolidated: boolean;
      includePONumber: boolean;
    };
  };

  const handlepaySaveChanges = () => {
    const paymentData = {
      accountholdername,
      accountnumber,
      bankname,
      ifsccode,
      selectedPayment,
      invoicePreferences,
    };

    console.log("Saving profile data:", paymentData);
    localStorage.setItem("paymentSettings", JSON.stringify(paymentData));
    localStorage.removeItem("paymentSettings");
    toast.success("Payment settings updated successfully");
    setPaymentEdit(false);
  };

  const enablepaymentEditMode = () => {
    setOriginalpayData({
      accountholdername,
      accountnumber,
      bankname,
      ifsccode,
      selectedPayment,
      invoicePreferences: { ...invoicePreferences },
    });
    setPaymentEdit(true);
  };

  const handelcancelpay = () => {
    if (!originalpaydata) return;

    setAccountholdername(originalpaydata.accountholdername);
    setAccountnumber(originalpaydata.accountnumber);
    setBankname(originalpaydata.bankname);
    setIfsccode(originalpaydata.ifsccode);
    setSelectedPayment(originalpaydata.selectedPayment);
    setInvoicePreferences({
      receiveByEmail: originalpaydata.invoicePreferences.receiveByEmail,
      monthlyConsolidated: originalpaydata.invoicePreferences.monthlyConsolidated,
      includePONumber: originalpaydata.invoicePreferences.includePONumber,
    });
    setPaymentEdit(false);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("paymentSettings");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setAccountholdername(parsed.accountholdername || "");
      setAccountnumber(parsed.accountnumber || null);
      setBankname(parsed.bankname || "");
      setIfsccode(parsed.ifsccode || "");
      setSelectedPayment(parsed.selectedPayment || "bank");

      setInvoicePreferences({
        receiveByEmail: parsed.invoicePreferences?.receiveByEmail ?? true,
        monthlyConsolidated: parsed.invoicePreferences?.monthlyConsolidated ?? true,
        includePONumber: parsed.invoicePreferences?.includePONumber ?? true,
      });
    }
  }, []);

  return (
    <Card className="p-6 m-6 bg-white">
      <div className="flex flex-row items-start justify-between mb-4">
        {/* Left side - Title + Info */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold text-primary-800 mr-2">Payment Settings</h2>
            <button
              type="button"
              onClick={() => setShowInfo((prev) => !prev)}
              className="text-primary-500 hover:text-primary-700"
              aria-label="More info"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>

          {/* Fixed space for description */}
          <div className="min-h-[25px]"> {/* Matches other sections */}
            {showInfo && (
              <p className="text-sm text-gray-600 mt-1">
                Manage how your business handles billing, payment methods, and invoice preferences here.
              </p>
            )}
          </div>
        </div>

        {/* Right side - Edit button */}
        {!paymentEdit && (
          <Button
            onClick={() => enablepaymentEditMode()}
            variant="outline"
            size="sm"
            className="mt-[10px] text-primary-700" // Matches other sections
          >
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
        )}
      </div>


      <h3 className="text-lg font-semibold text-primary-800 mb-4">Bank Account Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            Account Number
          </label>
          <Input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={18}
            value={firstAccountNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setFirstAccountNumber(value);
            }}
            placeholder="Enter account number"
            className="w-full border-gray-400"
            disabled={!paymentEdit}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            Re-enter Account Number
          </label>
          <Input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={18}
            value={accountnumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setAccountnumber(value);
            }}
            placeholder="Re-enter account number to confirm"
            className={`w-full border-gray-400 ${accountnumber && accountnumber !== firstAccountNumber ? "border-red-500" : ""
              }`}
            disabled={!paymentEdit}
          />
          {accountnumber && accountnumber !== firstAccountNumber && (
            <p className="mt-1 text-sm text-red-600">Account numbers don't match</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            Account Holder Name
          </label>
          <Input
            type="text"
            value={accountholdername}
            onChange={(e) => setAccountholdername(e.target.value)}
            placeholder="Steel Plant Ltd."
            className="w-full border-gray-400"
            disabled={!paymentEdit}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            Bank Name
          </label>
          <Input
            type="text"
            value={bankname}
            onChange={(e) => setBankname(e.target.value)}
            placeholder="HDFC Bank"
            className="w-full border-gray-400"
            disabled={!paymentEdit}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            IFSC Code
          </label>
          <Input
            type="text"
            value={ifsccode}
            onChange={(e) => {
              const upperValue = e.target.value.toUpperCase();
              const isValid = /^[A-Z0-9]*$/.test(upperValue);
              if (isValid) setIfsccode(upperValue);
            }}
            placeholder="HDFC0000123"
            maxLength={11}
            className="w-full border-gray-400"
            disabled={!paymentEdit}
          />
        </div>
      </div>



      <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className={`p-4 cursor-pointer ${selectedPayment === "bank" ? "border-2 border-blue-500 bg-blue-50" : ""
            }`}
          onClick={() => paymentEdit && setSelectedPayment("bank")}
        >
          <div className="flex items-center mb-2">
            <input type="radio" className="mr-2" checked={selectedPayment === "bank"} disabled={!paymentEdit} readOnly />
            <h4 className="font-medium">NEFT</h4>
          </div>
          <p className="text-sm text-gray-600 pl-5">
            National Electronic Funds Transfer
          </p>
        </Card>

        <Card
          className={`p-4 cursor-pointer ${selectedPayment === "upi" ? "border-2 border-blue-500 bg-blue-50" : ""
            }`}
          onClick={() => paymentEdit && setSelectedPayment("upi")}
        >
          <div className="flex items-center mb-2">
            <input type="radio" className="mr-2" checked={selectedPayment === "upi"} disabled={!paymentEdit} readOnly />
            <h4 className="font-medium">RTGS</h4>
          </div>
          <p className="text-sm text-gray-600 pl-5">
            Real Time Gross Settlement
          </p>
        </Card>

        <Card
          className={`p-4 cursor-pointer ${selectedPayment === "card" ? "border-2 border-blue-500 bg-blue-50" : ""
            }`}
          onClick={() => paymentEdit && setSelectedPayment("card")}
        >
          <div className="flex items-center mb-2">
            <input type="radio" className="mr-2" checked={selectedPayment === "card"} disabled={!paymentEdit} readOnly />
            <h4 className="font-medium">IMPS</h4>
          </div>
          <p className="text-sm text-gray-600 pl-5">
            Immediate Payment Service.
          </p>
        </Card>
      </div>



      <h3 className="text-lg font-semibold text-gray-800 mt-4">Invoice Preferences</h3>

      <div className="space-y-4 mt-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 accent-gray-400 cursor-default"
            checked={true}
            readOnly
          />
          <label className="text-sm font-medium text-gray-600">Receive invoices by email</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 accent-gray-400 cursor-default"
            checked={true}
            readOnly
          />
          <label className="text-sm font-medium text-gray-600">Generate consolidated monthly invoice</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 accent-gray-400 cursor-default"
            checked={true}
            readOnly
          />
          <label className="text-sm font-medium text-gray-600">Include PO number on invoices</label>
        </div>
      </div>


      <div className="flex justify-end gap-4 mt-8">
        {paymentEdit && (
          <>
            <Button onClick={handlepaySaveChanges}>
              Save
            </Button>
            <Button onClick={handelcancelpay} variant="outline">
              Cancel
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}

export default Payment;