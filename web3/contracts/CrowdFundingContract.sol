// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    // constructor() {}
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target; //amount we want to achieve
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    // mapping
    mapping(uint256 => Campaign) public campaigns;
    // we created mapping such that we can use campaigns[0];

    // global variable to keep track of number of campaign
    uint256 public numberOfCampaigns = 0;

    // underscore to signify that it is a parameter
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) { // public signifies it can be accessible from frontend, return return-type
        Campaign storage campaign = campaigns[numberOfCampaigns];
        // require : check if every thing is good in solidity 
        // block.timestamp : current time
        require(campaign.deadline < block.timestamp, "the deadline should a date in future"); 
        
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        numberOfCampaigns++;
        
        return numberOfCampaigns-1;
    }
    // payable is a keyword in solidity that signifies that in this function we are going to send the crypto in this function
    function donateToCampaign(uint256 _id) public payable { 
        uint256 amount = msg.value; // this is what we are trying to send from frontend

        Campaign storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value:amount}(""); // sending money to campaign.owner return two values
        if(sent){
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }
    // view function : it is only able to return some data to be able to view it
    function getDonators(uint256 _id) view public returns (address [] memory,uint256[] memory) {
        return (campaigns[_id].donators,campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for(uint256 i=0;i< numberOfCampaigns; i++){
            Campaign storage item  = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
